import {Core} from '../engine/core';

export class Player{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.size = 16;
  }

  draw(){
    Core.ctx.fillStyle = '#188818';
    Core.ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  update(){

    this.x = Core.mouse.x;
    this.y = Core.mouse.y;

  }
}