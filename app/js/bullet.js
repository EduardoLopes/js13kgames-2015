import {BasicObject} from '../engine/BasicObject';
import {Core} from '../engine/core';
import {angle} from '../engine/angle';
import {distance} from '../engine/distance';
import {drawCircle} from '../engine/helper';

const SAT = require('../engine/sat/SAT.js');

export class Bullet extends BasicObject{
  constructor(options){

    super(options);

    this.angle = 0;
    this.ownerReference = options.ownerReference;
    this.setDead();
    this.speed = options.speed;
  }

  setAlive(){
    this.alive = true;
    this.nextPosition.x = this.ownerReference.x + (4);
    this.nextPosition.y = this.ownerReference.y + (4);
    this.colliding = false;
  }

  setDead(){
    this.alive = false;
  }

  reset(){

    this.x = this.y = 0;
    this.shape.pos.x = this.x;
    this.shape.pos.y = this.y;
    Bullet.collisionResponse.clear();

  }

  draw(){

    if(this.alive == false) return false;

    //Core.ctx.fillStyle = '';
    //Core.ctx.fillRect(this.x - Core.camera.x, this.y - Core.camera.y, this.width, this.height);

    drawCircle(
      (this.x + this.width / 2) - Core.camera.x,
      (this.y + this.height / 2) - Core.camera.y,
      (this.width / 2) + 2, //radius
      '#e96'
    );

  }

  update(){

    if(this.alive == false) return false;

    this.colliding = false;

    this.velocity.x = Math.cos(this.angle) * this.speed;
    this.velocity.y = Math.sin(this.angle) * this.speed;

    this.nextPosition.x += (this.velocity.x);
    this.nextPosition.y += (this.velocity.y);

    if(Core.maps[Math.floor(this.y / 384) % Core.maps.length].checkCollision(this, false)){
      this.setDead();
    };

    this.x = this.nextPosition.x;
    this.y = this.nextPosition.y;

  }
}