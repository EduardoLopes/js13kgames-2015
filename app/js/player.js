import {Core} from '../engine/core';

export class Player{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.nextPosition = {x: this.x, y: this.y};
    this.size = 16;
    this.goingUpOrDown = 'up';
  }

  draw(){
    Core.ctx.fillStyle = '#188818';
    Core.ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  update(){

/*    this.x = Core.mouse.x;
    this.y = Core.mouse.y;*/


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



  }
}