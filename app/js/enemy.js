import {BasicObject} from '../engine/BasicObject';
import {Core} from '../engine/core';
import {angle} from '../engine/angle';
import {distance} from '../engine/distance';
import {Bullet} from './bullet';
import {drawCircle} from '../engine/helper';
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
      ownerReference: this
    });

    this.goingUpOrDown = 'down';

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

    if(this.visible == false) return;

    this.bullet.draw();

    //Core.ctx.fillStyle = '#f52dee';

    if(distance(this.x + (this.width / 2), this.y + (this.height / 2), Core.player.x + (Core.player.width / 2), Core.player.y + (Core.player.height / 2)) < 128 && Core.pause == false){
      Core.ctx.strokeStyle = 'rgba(255,0,40,0.2)';
      Core.ctx.beginPath();
      Core.ctx.moveTo((Core.player.x + 8) - Core.camera.x, (Core.player.y + 8) - Core.camera.y);
      Core.ctx.lineTo((this.x + 8) - Core.camera.x, (this.y + 8) - Core.camera.y);
      Core.ctx.closePath();
      Core.ctx.stroke();
    }

    drawCircle(
      (this.x + this.width / 2) - Core.camera.x,
      (this.y + this.height / 2) - Core.camera.y,
      (this.width / 2) + 2, //radius
      '#f52dee'
    );

    //Core.ctx.fillRect(this.x - Core.camera.x, this.y - Core.camera.y, this.width, this.height);

  }

  update(){

  if(this.active == false) return;

    this.bullet.update();

    if(distance(this.x + (this.width / 2), this.y + (this.height / 2), Core.player.x + (Core.player.width / 2), Core.player.y + (Core.player.height / 2)) < 128 && this.bullet.alive == false){

      this.bullet.angle = angle(this.x + (this.width / 2), this.y + (this.height / 2), Core.player.x + (Core.player.width / 2), Core.player.y + (Core.player.height / 2));
      this.bullet.nextPosition.x = this.x + (4);
      this.bullet.nextPosition.y = this.y + (4);

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
    }

  }
}

Enemy.bulletCollisionResponse = new SAT.Response();