import {Core} from '../engine/core';
import {BasicObject} from '../engine/BasicObject';

export class Player extends BasicObject{
  constructor(options){

    super(options)

    this.nextPosition = {x: this.x, y: this.y};
    this.goingUpOrDown = 'up';

  }

  draw(){

    Core.ctx.fillStyle = '#188818';
    Core.ctx.fillRect(this.x - Core.camera.x, this.y - Core.camera.y, this.width, this.height);

  }

  update(){

    if(Core.keys[38]){
      this.nextPosition.y -= 2;
      this.goingUpOrDown = 'up';
    } else if(Core.keys[40]){
      this.nextPosition.y += 2;
      this.goingUpOrDown = 'down';
    }

    if(Core.keys[37]){
      this.nextPosition.x -= 2;
    } else if(Core.keys[39]){
      this.nextPosition.x += 2;
    }

    this.nextPosition.y = Math.max(this.nextPosition.y, Core.camera.y);



  }
}