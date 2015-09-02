import {Core} from './core';

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

/*    console.log(firstX,
firstY,
lastX,
lastY)*/

    for (let y = firstY; y < lastY; y++) {
      for (let x = firstX; x < lastX; x++) {

        let index = this.cols * y + x;
        if(this.map[index] > 0){
          Core.ctx.fillStyle = '#181818';
          Core.ctx.fillRect(((x * this.tilesize) + this.x) - Core.camera.x, ((y * this.tilesize) + this.y) - Core.camera.y, this.tilesize, this.tilesize);
        }

      }
    };

  }

  update(){

  }

}