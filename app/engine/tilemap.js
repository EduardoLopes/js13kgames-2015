import {Core} from './core';
const SAT = require('sat');

export class Tilemap{

  constructor(options){

    this.map = options.map;
    this.tilesize = 16;
    this.width = options.width;
    this.height = options.height;
    this.rows = options.rows;
    this.cols = options.cols;
    this.x = options.x;
    this.y = options.y;

    //this is only for debug
    //the camera class still will be implemented

  }

  draw(){

    let firstX = ((Core.camera.x - this.x)) / this.tilesize >> 0;
    let firstY = ((Core.camera.y - this.y)) / this.tilesize >> 0;
    let lastX = (Core.screen.size.x + (Core.camera.x - this.x)) / this.tilesize >> 0;
    let lastY = (Core.screen.size.y + (Core.camera.y - this.y)) / this.tilesize >> 0;

    if((Core.camera.x) % this.tilesize){
      lastX+=1;
    }

    if(Core.camera.y % this.tilesize){
      lastY+=1;
    }

    for (let y = firstY; y < lastY; y++) {
      for (let x = firstX; x < lastX; x++) {

        let index = this.cols * y + x;
        if(this.map[index] > 0){
          Core.ctx.fillStyle = 'rgba(24,24,24,1)';
          Core.ctx.fillRect(((x * this.tilesize) + this.x) - Core.camera.x, ((y * this.tilesize) + this.y) - Core.camera.y, this.tilesize, this.tilesize);
        }

      }
    };

  }

  tileIsSolid(x, y){

    x = (x - this.x) / this.tilesize >> 0;
    y = (y - this.y) / this.tilesize >> 0;

    return this.map[this.cols * y + x] > 0;

  }

    checkTileCollision(w, h, object){

      if(this.tileIsSolid(w * 16, h * 16)){

        Core.ctx.fillStyle = '#ffe88d';
        Core.ctx.fillRect(((w * 16)) - Core.camera.x, ((h * 16)) - Core.camera.y, 16, 16);

        object.shape.pos.x = object.nextPosition.x;
        object.shape.pos.y = object.nextPosition.y;

        Tilemap.tileShape.pos.x = w * 16;
        Tilemap.tileShape.pos.y = h * 16;

        SAT.testPolygonPolygon(object.shape, Tilemap.tileShape, Tilemap.collisionResponse);

        object.nextPosition.x -= Tilemap.collisionResponse.overlapV.x;
        object.nextPosition.y -= Tilemap.collisionResponse.overlapV.y;

        Tilemap.collisionResponse.clear();

      }

  }

  checkCollision(object){

    let minX = Math.floor(((object.nextPosition.x)) / 16);
    let maxX = Math.floor(((object.nextPosition.x) + 16) / 16);
    let minY = Math.floor(((object.nextPosition.y)) / 16);
    let maxY = Math.floor(((object.nextPosition.y) + 16) / 16);

    if(object.goingUpOrDown == 'up'){

      for (let h = maxY; h >= minY; h--) {
        for (let w = maxX; w >= minX; w--) {

          this.checkTileCollision(w, h, object);

        }
      }

    } else if(object.goingUpOrDown == 'down'){

      for (let h = minY; h <= maxY; h++) {
        for (let w = minX; w <= maxX; w++) {

          this.checkTileCollision(w, h, object);

        }
      }

    }

    object.x = object.nextPosition.x;
    object.y = object.nextPosition.y;

  }

  update(){

    if(Core.camera.y > this.height + this.y){
      this.y += (this.height * 4);
    }

  }

}

Tilemap.tileShape = new SAT.Box(new SAT.Vector(0, 0), 16, 16).toPolygon();
Tilemap.collisionResponse = new SAT.Response();