import {BasicObject} from '../engine/BasicObject';
import {Core} from '../engine/core';
import {angle} from '../engine/angle';
import {distance} from '../engine/distance';
import {Bullet} from './bullet';
import {drawCircle, drawLine} from '../engine/helper';
const SAT = require('../engine/sat/SAT.js');

export class Enemy extends BasicObject{
  constructor(options){

    super(options);

    this.bullet = new Bullet({
      x: 0,
      y: 0,
      width: 4,
      height: 4,
      speed: 3,
      color: Core.colors.eb,
      ownerReference: this
    });

    this.radius = (this.width / 2) + 2;

  }

  checkBulletCollisionAgainstPlayer(){

    if(this.bullet.alive == false) return;

    this.bullet.shape.pos.x = this.bullet.nextPosition.x;
    this.bullet.shape.pos.y = this.bullet.nextPosition.y;

    Core.player.shape.pos.x = Core.player.nextPosition.x;
    Core.player.shape.pos.y = Core.player.nextPosition.y;

    let collide = SAT.testPolygonPolygon(this.bullet.shape, Core.player.shape, Enemy.bulletCollisionResponse);

    Enemy.bulletCollisionResponse.clear();

    return collide;

  }

  kill(){
    this.visible = this.active = false;
  }

  draw(){

    if(this.visible == false){
      this.radius += (0 - this.radius) * 0.4;
    }

    drawCircle(
      (this.x + this.width / 2) - Core.camera.x,
      (this.y + this.height / 2) - Core.camera.y,
      this.radius, //radius
      Core.colors.e
    );

    if(this.visible == false) return;

    this.bullet.draw();

    //Core.ctx.fillStyle = '#f52dee';

    if(distance(this.x + (this.width / 2), this.y + (this.height / 2), Core.player.x + (Core.player.width / 2), Core.player.y + (Core.player.height / 2)) < 128 && Core.pause == false){

      drawLine(
        (Core.player.x + 8) - Core.camera.x,
        (Core.player.y + 8) - Core.camera.y,
        (this.x + 8) - Core.camera.x,
        (this.y + 8) - Core.camera.y,
        'rgba(179,49,50,0.2)'
      );

    }

    //Core.ctx.fillRect(this.x - Core.camera.x, this.y - Core.camera.y, this.width, this.height);

  }

  update(){

  if(this.active == false) return;

    this.bullet.update();

    if(distance(this.x + (this.width / 2), this.y + (this.height / 2), Core.player.x + (Core.player.width / 2), Core.player.y + (Core.player.height / 2)) < 128 && this.bullet.alive == false){

      this.bullet.angle = angle(this.x + (this.width / 2), this.y + (this.height / 2), Core.player.x + (Core.player.width / 2), Core.player.y + (Core.player.height / 2));
      this.bullet.nextPosition.x = this.x + (4);
      this.bullet.nextPosition.y = this.y + (4);
      this.radius = (this.width / 2) + 6;
      if(Math.cos(this.bullet.angle) > 0) {
        Core.camera.shake(-5);
      } else {
        Core.camera.shake(5);
      }

      this.bullet.setAlive();

    }

    if(this.checkBulletCollisionAgainstPlayer()){
      //Core.resetGame();
      //this.bullet.setDead();
      Core.highScore = Math.max(Core.highScore, Core.camera.cameraMaxY);
      Core.pause = true;
      Core.timeHolder = 0;
      Core.camera._shake = 0;
    }

    this.radius += (((this.width / 2) + 2) - this.radius) * 0.2;

  }
}

Enemy.bulletCollisionResponse = new SAT.Response();