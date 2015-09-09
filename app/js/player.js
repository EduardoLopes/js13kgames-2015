import {Core} from '../engine/core';
import {BasicObject} from '../engine/BasicObject';
import {angle} from '../engine/angle';
import {lerp} from '../engine/lerp';
import {distance} from '../engine/distance';



export class Player extends BasicObject{
  constructor(options){

    super(options)

    this.nextPosition = {x: this.x, y: this.y};
    this.goingUpOrDown = 'up';
    this.angleToGo = angle(this.x + (this.width / 2), this.y + (this.height / 2), Core.mouse.lastClick.x, Core.mouse.lastClick.y);
    this.speed = 10;
  }

  draw(){

    Core.ctx.fillStyle = '#ff006c';
    Core.ctx.fillRect(this.x - Core.camera.x, this.y - Core.camera.y, this.width, this.height);

  }

  moveTo(position){

    this.angleToGo = angle(this.x + (this.width / 2), this.y + (this.height / 2), Core.mouse.lastClick.x, Core.mouse.lastClick.y);

      let x = Math.cos(this.angleToGo) * this.speed;
      let y = Math.sin(this.angleToGo) * this.speed;

      if(distance(this.x + (this.width / 2), this.y + (this.height / 2), Core.mouse.lastClick.x, Core.mouse.lastClick.y) >= this.speed){

        this.nextPosition.x += x;
        this.nextPosition.y += y;
        this.speed = 5;

      } else {
        this.nextPosition.x = position.x - (this.width / 2);
        this.nextPosition.y = position.y - (this.height / 2);
        this.speed = 0;
      }

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