import {Core} from './core';
const SAT = require('./sat/SAT.js');

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

    x = (x) / this.tilesize >> 0;
    y = (y) / this.tilesize >> 0;

    return this.map[this.cols * y + x] > 0;

  }

    checkTileCollision(w, h, object, separate){

      if(this.tileIsSolid((w * 16) - this.x, (h * 16) - this.y)){

        object.shape.pos.x = object.nextPosition.x;
        object.shape.pos.y = object.nextPosition.y;

        Tilemap.tileShape.pos.x = w * 16;
        Tilemap.tileShape.pos.y = h * 16;

        SAT.testPolygonPolygon(object.shape, Tilemap.tileShape, Tilemap.collisionResponse);

        if(separate){
          object.nextPosition.x -= Tilemap.collisionResponse.overlapV.x;
          object.nextPosition.y -= Tilemap.collisionResponse.overlapV.y;
        }

        object.colliding = Tilemap.collisionResponse.overlapV.x != 0 || Tilemap.collisionResponse.overlapV.y != 0;

        Tilemap.collisionResponse.clear();

      }
      //debug stuff
      /*Core.ctx.fillStyle = 'rgba(15,200,15, 0.2)';
      Core.ctx.fillRect((w * 16) - Core.camera.x, (h * 16) - Core.camera.y, 16, 16);

      Core.ctx.fillStyle = 'rgba(122,255,255, 0.2)';
      Core.ctx.fillRect(object.nextPosition.x - Core.camera.x, object.nextPosition.y - Core.camera.y, object.width, object.height);*/

  }

  checkCollision(object, separate = true){

    let minX = Math.floor(((object.nextPosition.x)) / 16);
    let maxX = Math.floor(((object.nextPosition.x) + 16) / 16);
    let minY = Math.floor(((object.nextPosition.y)) / 16);
    let maxY = Math.floor(((object.nextPosition.y) + 16) / 16);

    if(object.goingUpOrDown == 'up'){

      for (let h = maxY; h >= minY; h--) {
        for (let w = maxX; w >= minX; w--) {

          this.checkTileCollision(w, h, object, separate);

        }
      }

    } else if(object.goingUpOrDown == 'down'){

      for (let h = minY; h <= maxY; h++) {
        for (let w = minX; w <= maxX; w++) {

          this.checkTileCollision(w, h, object, separate);

        }
      }

    }

    if(separate){
      object.x = object.nextPosition.x;
      object.y = object.nextPosition.y;
    }

    return object.colliding;

  }

  update(){


  }

}

Tilemap.tileShape = new SAT.Box(new SAT.Vector(0, 0), 16, 16).toPolygon();
Tilemap.collisionResponse = new SAT.Response();