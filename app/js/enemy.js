import {BasicObject} from '../engine/BasicObject';
import {Core} from '../engine/core';

export class Enemy extends BasicObject{
  constructor(options){

    super(options);

  }

  draw(){

    Core.ctx.fillStyle = '#2f3e3f';
    Core.ctx.fillRect(this.x - Core.camera.x, this.y - Core.camera.y, this.width, this.height);

  }

  update(){

  }
}