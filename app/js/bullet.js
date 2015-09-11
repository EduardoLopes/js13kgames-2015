import {BasicObject} from '../engine/BasicObject';
import {Core} from '../engine/core';
import {angle} from '../engine/angle';
import {distance} from '../engine/distance';

export class Bullet extends BasicObject{
  constructor(options){

    super(options);

    this.angle = 0;
    this.goingUpOrDown = 'down';

    this.setDead();
  }

  setAlive(){
    this.alive = true;
  }

  setDead(){
    this.alive = false;
  }

  draw(){

    if(this.alive == false) return false;

    Core.ctx.fillStyle = '#e96';
    Core.ctx.fillRect(this.x - Core.camera.x, this.y - Core.camera.y, this.width, this.height);

  }

  update(){

    if(this.alive == false) return false;

    this.colliding = false;

    this.velocity.x = Math.cos(this.angle) * 2;
    this.velocity.y = Math.sin(this.angle) * 2;

    this.nextPosition.x += (this.velocity.x);
    this.nextPosition.y += (this.velocity.y);


    if(Core.maps[Math.floor(this.y / 384) % Core.maps.length].checkCollision(this, false)){
      this.setDead();
    };

    this.x = this.nextPosition.x;
    this.y = this.nextPosition.y;

  }
}