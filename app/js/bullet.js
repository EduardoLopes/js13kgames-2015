import {BasicObject} from '../engine/BasicObject';
import {Core} from '../engine/core';
import {angle} from '../engine/angle';
import {distance} from '../engine/distance';

const SAT = require('../engine/sat/SAT.js');

export class Bullet extends BasicObject{
  constructor(options){

    super(options);

    this.angle = 0;
    this.enemy = options.enemy;
    this.setDead();
  }

  setAlive(){
    this.alive = true;
    this.nextPosition.x = this.enemy.x + (4);
    this.nextPosition.y = this.enemy.y + (4);
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

    Core.ctx.fillStyle = '#e96';
    Core.ctx.fillRect(this.x - Core.camera.x, this.y - Core.camera.y, this.width, this.height);

  }

  checkCollisionAgainstPlayer(){

    //console.log(Bullet.collisionResponse.overlapV);
    //Bullet.collisionResponse.overlapV.x = 0;
    //Bullet.collisionResponse.overlapV.y = 0;

    this.shape.pos.x = this.nextPosition.x;
    this.shape.pos.y = this.nextPosition.y;

    Core.player.shape.pos.x = Core.player.nextPosition.x;
    Core.player.shape.pos.y = Core.player.nextPosition.y;

    let collide = SAT.testPolygonPolygon(this.shape, Core.player.shape, Bullet.collisionResponse);

    Bullet.collisionResponse.clear();

    return collide;

  }

  update(){

    if(this.alive == false) return false;

    this.colliding = false;

    this.velocity.x = Math.cos(this.angle) * 1 ;
    this.velocity.y = Math.sin(this.angle) * 1 ;

    this.nextPosition.x += (this.velocity.x);
    this.nextPosition.y += (this.velocity.y);

    if(Core.maps[Math.floor(this.y / 384) % Core.maps.length].checkCollision(this, false)){
      this.setDead();
    };

    this.x = this.nextPosition.x;
    this.y = this.nextPosition.y;

    if(this.checkCollisionAgainstPlayer()){
      Core.resetGame();
      this.setDead();
    }


  }
}

Bullet.collisionResponse = new SAT.Response();