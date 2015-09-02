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
    this.camera = {x: 0, y: 0};

  }

  draw(){

    let firstX = (this.camera.x) / this.tilesize >> 0;
    let firstY = (this.camera.y) / this.tilesize >> 0;
    let lastX = (Core.screen.size.x + this.camera.x) / this.tilesize >> 0;
    let lastY = (Core.screen.size.y + this.camera.y) / this.tilesize >> 0;

    for (let y = firstY; y < lastY; y++) {
      for (let x = firstX; x < lastX; x++) {

        let index = this.cols * y + x;
        if(this.map[index] > 0){
          Core.ctx.fillStyle = '#181818';
          Core.ctx.fillRect((x * this.tilesize) + this.x, (y * this.tilesize) + this.y, this.tilesize, this.tilesize);
        }

      }
    };

  }

  update(){

  }

}