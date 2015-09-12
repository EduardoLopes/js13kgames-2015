import {Core} from '../engine/core';
import {BasicObject} from '../engine/BasicObject';
import {angle} from '../engine/angle';
import {drawCircle} from '../engine/helper';
import {distance} from '../engine/distance';
import {Bullet} from './bullet';
const PF = require('pathfinding');
const SAT = require('../engine/sat/SAT.js');

export class Player extends BasicObject{
  constructor(options){

    super(options)

    this.angleToGo = angle(this.x + (this.width / 2), this.y + (this.height / 2), Core.mouse.lastClick.x, Core.mouse.lastClick.y);
    this.speed = 10;
    this.path = [];
    this.pathNormalizedMapY = Core.camera.normalizedMapY;

    this.bullet = new Bullet({
      x: 0,
      y: 0,
      width: 6,
      height: 6,
      speed: 5,
      ownerReference: this
    });

    this.radius = (this.width / 2) + 2;

  }

  shoot(x, y){

    if(this.bullet.alive == false){
      this.bullet.angle = angle(this.x + (this.width / 2), this.y + (this.height / 2), x, y);
      this.bullet.nextPosition.x = this.x + (4);
      this.bullet.nextPosition.y = this.y + (4);

      if(Math.cos(this.bullet.angle) > 0) {
        Core.camera.shake(-10);
      } else {
        Core.camera.shake(10);
      }

      this.bullet.setAlive();
    }

  }

  draw(){

    drawCircle(
      (this.x + this.width / 2) - Core.camera.x,
      (this.y + this.height / 2) - Core.camera.y,
      this.radius, //radius
      '#ff006c'
    );
    this.bullet.draw();

    /*Core.ctx.fillStyle = '#ff006c';
    Core.ctx.fillRect(this.x - Core.camera.x, this.y - Core.camera.y, this.width, this.height);*/

  }

  reset(){
    this.path.length = 0;
    this.pathNormalizedMapY = 0;
    this.speed = 0;
    this.angleToGo = 0;
    this.bullet.setDead();
  }

  moveTo(position){

    if(this.path.length == 0) return false;

    var toX = (this.path[0][0] * 16) + (this.width / 2);
    var toY = (((this.path[0][1] + this.pathNormalizedMapY * 24) * 16) + (this.height / 2));

    //console.log(toX, toY, toY - (Core.camera.normalizedMapY * Core.camera.h), (Core.camera.normalizedMapY * Core.camera.h));

/*    var toX = Core.mouse.lastClick.x;
    var toY = Core.mouse.lastClick.y;*/

    //console.log(toX, toY);

    Core.ctx.fillStyle = '#000';
    Core.ctx.fillRect(toX*16, toY* 16, 16, 16)

    this.angleToGo = angle(this.x + (this.width / 2), this.y + (this.height / 2), toX, toY);

      this.velocity.x = Math.cos(this.angleToGo) * this.speed;
      this.velocity.y = Math.sin(this.angleToGo) * this.speed;

      if(distance(this.x + (this.width / 2), this.y + (this.height / 2), toX, toY) >= this.speed){

        this.nextPosition.x += this.velocity.x;
        this.nextPosition.y += this.velocity.y;
        this.speed = 5;

      } else {

        this.nextPosition.x = toX - (this.width / 2);
        this.nextPosition.y = toY - (this.height / 2);
        this.speed = 0;
        this.path.shift();
      }

      //console.log(this.nextPosition.x, this.nextPosition.y);

  }

  checkBulletCollisionAgainstEnemy(){

    for (let i = 0; i < Core.maps[Math.floor(this.bullet.y / 384) % Core.maps.length].enemies.length; i++) {
      let enemy = Core.maps[Math.floor(this.bullet.y / 384) % Core.maps.length].enemies[i];

      enemy.shape.pos.x = enemy.x;
      enemy.shape.pos.y = enemy.y;

      this.bullet.shape.pos.x = this.bullet.nextPosition.x;
      this.bullet.shape.pos.y = this.bullet.nextPosition.y;

      let collide = SAT.testPolygonPolygon(this.bullet.shape, enemy.shape, Player.bulletCollisionResponse);

      if(collide && enemy.visible){
        enemy.kill();
        this.bullet.setDead();
      }

      Player.bulletCollisionResponse.clear();
    }

  }

  update(){

    this.bullet.update();

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

    this.nextPosition.y = Math.max(this.nextPosition.y, (Core.camera.y));

    Core.maps[Math.floor(this.y / 384) % Core.maps.length].checkCollision(this);

    this.playerYPos = Core.camera.normalizedMapY;

    if(Core.mouse.justPressed && Core.mouse.state == 'Free'){
      var gridBackup = Core.pathfinderGrid.clone();
      this.pathNormalizedMapY = Core.camera.normalizedMapY;
      this.path = Core.pathfinder.findPath(
        ((this.x) / 16 >> 0),
        ((this.y) / 16 >> 0) - ((Core.camera.normalizedMapY * 24)),
        ((Core.mouse.lastClick.x) / 16 >> 0),
        ((Core.mouse.lastClick.y) / 16 >> 0) - ((Core.camera.normalizedMapY * 24)),
        gridBackup
      );

      //console.log(Core.camera.normalizedMapHeight +  Core.camera.normalizedMapY);
      if(this.path.length != 0) {
        this.path = PF.Util.smoothenPath(gridBackup, this.path);
      }

    }
    //path finder debug
    //Core.ctx.fillStyle = '#e2f36e';
/*    for (var i = 0; i < this.path.length; i++) {

      Core.ctx.fillRect(((this.path[i][0] * 16)) - Core.camera.x, ((this.path[i][1] * 16)) - Core.camera.y + ((this.pathNormalizedMapY * 24) * 16), 16, 16)

    };*/

    this.moveTo(Core.mouse.lastClick);

    this.checkBulletCollisionAgainstEnemy();

    this.radius += (((this.width / 2) + 2) - this.radius) * 0.2;

  }
}

Player.bulletCollisionResponse = new SAT.Response();