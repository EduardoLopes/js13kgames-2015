import {Core} from './core';
import {Vector2} from './vector2';
import {BasicObject} from './BasicObject';
import {distance} from './distance';
import {drawCircle, drawLine} from '../engine/helper';

export class Mouse{
  constructor(x, y){
    this.x = 0;
    this.y = 0;
    this.screen = new Vector2(0, 0);
    this.lastClick = new Vector2(32, 16);
    this.down = false;
    this.rect = null;
    this.justPressed = false;
    this.maxSize = 10;
    this.size = 10;
    this.state = 'Free';
    this.IDenemyLocked = 0;
    this.touch = false;

    this.addEventCanvas('mousemove',function(e){
      e.preventDefault();
      this.setMousePosition(e);

    }.bind(this));

    this.addEventCanvas('mousedown',function(e){
      e.preventDefault();
      this.setMousePosition(e);
      this.down = true;
      this.justPressed = true;
      this.lastClick.x = this.screen.x;
      this.lastClick.y = this.screen.y;

    }.bind(this));

    this.addEventCanvas('mouseup',function(e){
      e.preventDefault();
      this.setMousePosition(e);
      this.down = false;

    }.bind(this));

    this.addEventCanvas('touchstart',function(e){
      e.preventDefault();
      this.touch = true;

      this.setTouchPosition(e);
      this.down = true;
      this.justPressed = true;
      this.lastClick.x = this.screen.x;
      this.lastClick.y = this.screen.y;

    }.bind(this));

    this.addEventCanvas('touchend',function(e){
      e.preventDefault();

      this.down = false;

    }.bind(this));

  }

  addEventCanvas(event, callback){

    Core.canvas.addEventListener(event, callback.bind(this));

  }

  setTouchPosition(e){

    this.rect = Core.canvas.getBoundingClientRect();
    this.setPosition(e.touches[0].clientX - this.rect.left, e.touches[0].clientY - this.rect.top);

  }

  setMousePosition(e){

    this.rect = Core.canvas.getBoundingClientRect();
    this.setPosition(e.clientX - this.rect.left, e.clientY - this.rect.top);

  }

  setPosition(x, y){

    this.x = x;
    this.y = y;

    this.screen.x = this.x + Core.camera.x;
    this.screen.y = this.y + Core.camera.y;
  }

  checkDistanceToEnemy(){

    for (let i = 0; i < Core.maps[Math.floor(this.screen.y / 384) % Core.maps.length].enemies.length; i++) {
      let enemy = Core.maps[Math.floor(this.screen.y / 384) % Core.maps.length].enemies[i];
      if(distance(enemy.x + (enemy.width / 2), enemy.y + (enemy.height / 2), this.screen.x, this.screen.y) < 20 && enemy.visible == true)  {
        this.IDenemyLocked = i;
        this.state = 'Locked';
      }
    };

  }

  drawFree(){

    if(this.touch) return false;

    Core.ctx.strokeStyle = '#181818';
    drawCircle(
      this.x,
      this.y,
      this.size,
      'rgba(255,255,255,0.2)'
    );
    Core.ctx.stroke();

  }

  updateFree(){

    if(this.justPressed){
      this.size = 2;
    }

    this.size += (this.maxSize - this.size) * 0.2;

    this.checkDistanceToEnemy();

  }

  drawLocked(){


    if(Core.player.bullet.alive == false && Core.pause == false){
      Core.ctx.strokeStyle = Core.colors.b;

      drawLine(
        (Core.player.x + 8) - Core.camera.x,
        (Core.player.y + 8) - Core.camera.y,
        this.x,
        this.y,
        '#8F82AC'
      );

      Core.ctx.strokeStyle = 'rgba(179,49,50,0.6)';

    } else {
      Core.ctx.strokeStyle = '#B33132';
    }

    drawCircle(
      this.x,
      this.y,
      this.size,
      'rgba(179,49,50,0.2)'
    );
    Core.ctx.stroke();

  }

  updateLocked(){

    this.size += (16 - this.size) * 0.2;

    let enemy = Core.maps[Math.floor(this.screen.y / 384) % Core.maps.length].enemies[this.IDenemyLocked];

    this.x = (enemy.x - Core.camera.x) + (enemy.width / 2);
    this.y = (enemy.y - Core.camera.y) + (enemy.height / 2);

    if(distance(enemy.x + (enemy.width / 2), enemy.y + (enemy.height / 2), this.screen.x, this.screen.y) > 32 || enemy.visible == false)  {
      this.state = 'Free';
    }

    if(
      (this.justPressed && Core.player.bullet.alive == false) ||
      (this.touch == true && Core.player.bullet.alive == false && enemy.visible == true)){
      this.size = 10;
      Core.player.radius = (Core.player.width / 2) + 8;
      Core.player.shoot(enemy.x + (enemy.width / 2), enemy.y + (enemy.height / 2));
      if(this.touch){
        this.state = 'Free';
      }
    }

  }

  draw(){

    this['draw'+this.state]();

  }

  update(){

    this['update'+this.state]();

  }


}