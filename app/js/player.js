import {Core} from '../engine/core';
import {BasicObject} from '../engine/BasicObject';
import {angle} from '../engine/angle';
import {lerp} from '../engine/lerp';



export class Player extends BasicObject{
  constructor(options){

    super(options)

    this.nextPosition = {x: this.x, y: this.y};
    this.goingUpOrDown = 'up';
    this.angleToGo = angle(this.x + (this.width / 2), this.y + (this.height / 2), Core.mouse.lastClick.x, Core.mouse.lastClick.y);

  }

  draw(){

    Core.ctx.fillStyle = '#ff006c';
    Core.ctx.fillRect(this.x - Core.camera.x, this.y - Core.camera.y, this.width, this.height);

  }

  moveTo(position){

    //this.angleToGo = angle(this.x + (this.width / 2), this.y + (this.height / 2), Core.mouse.lastClick.x, Core.mouse.lastClick.y);

/*      let velocityx = Math.cos(this.angleToGo) * 10;
      let velocityy = Math.sin(this.angleToGo) * 10;*/

      let x = position.x - this.x;
      let y = position.y - this.y;

      this.nextPosition.x += x / 20;
      this.nextPosition.y += y / 20;

  }

  update(){

/*    if(Core.keys[38]){
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
    }*/

    this.nextPosition.y = Math.max(this.nextPosition.y, Core.camera.y);

    Core.maps[Math.floor(this.y / 384) % Core.maps.length].checkCollision(this);

    this.moveTo(Core.mouse.lastClick);

  }
}