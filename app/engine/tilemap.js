import {Core} from './core';
const SAT = require('sat');

const cacheCanvas = document.createElement('canvas');
const cacheCtx = cacheCanvas.getContext('2d');

function cacheTilemap(tilemap){

    cacheCanvas.width = tilemap.width;
    cacheCanvas.height = tilemap.height;

    for (let y = 0; y < tilemap.rows; y++) {
      for (let x = 0; x < tilemap.cols; x++) {

        let index = tilemap.cols * y + x;

        if(tilemap.map[index] > 0){
          cacheCtx.fillStyle = 'rgba(24,24,24,1)';
          cacheCtx.fillRect(((x * tilemap.tilesize)), ((y * tilemap.tilesize)), tilemap.tilesize, tilemap.tilesize);
        }

      }
    };

  return cacheCanvas.toDataURL("image/png");
}

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

    this.mapImage = new Image();

    this.mapImage.src = cacheTilemap(this);

  }

  draw(){

    Core.ctx.drawImage(this.mapImage, this.x - Core.camera.x, this.y - Core.camera.y);

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