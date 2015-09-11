import {Core} from './core';
import {Vector2} from './vector2';
import {BasicObject} from './BasicObject';
import {distance} from './distance';

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

    Core.canvas.addEventListener('mousemove',function(e){

      this.setMousePosition(e);

    }.bind(this));

    Core.canvas.addEventListener('mousedown',function(e){

      this.setMousePosition(e);
      this.down = true;
      this.justPressed = true;
      this.lastClick.x = this.screen.x;
      this.lastClick.y = this.screen.y;

    }.bind(this));

    Core.canvas.addEventListener('mouseup',function(e){

      this.setMousePosition(e);
      this.down = false;

    }.bind(this));

  }

  setMousePosition(e){

    this.rect = Core.canvas.getBoundingClientRect();
    this.x = e.clientX - this.rect.left;
    this.y = e.clientY - this.rect.top;
    this.screen.x = this.x + Core.camera.x;
    this.screen.y = this.y + Core.camera.y;

  }

  checkDistanceToEnemy(){

    for (let i = 0; i < Core.maps[Math.floor(this.screen.y / 384) % Core.maps.length].enemies.length; i++) {
      let enemy = Core.maps[Math.floor(this.screen.y / 384) % Core.maps.length].enemies[i];
      if(distance(enemy.x + (enemy.width / 2), enemy.y + (enemy.height / 2), this.screen.x, this.screen.y) < 10)  {
        this.IDenemyLocked = i;
        this.state = 'Locked';
      }
    };

  }

  drawFree(){

    Core.ctx.strokeStyle = '#181818';
    Core.ctx.fillStyle = 'rgba(255,255,255,0.2)';
    Core.ctx.beginPath();
    Core.ctx.arc(this.x, this.y, this.size, Math.PI * 2, 0, false);
    //Core.ctx.fillRect(this.x, this.y, 16, 16);
    Core.ctx.closePath();
    Core.ctx.stroke();
    Core.ctx.fill();

  }

  updateFree(){

    if(this.justPressed){
      this.size = 2;
    }

    this.size += (this.maxSize - this.size) * 0.2;

    this.checkDistanceToEnemy();

  }

  drawLocked(){

    Core.ctx.strokeStyle = '#181818';
    Core.ctx.fillStyle = 'rgba(255,25,25,0.2)';
    Core.ctx.beginPath();
    Core.ctx.arc(this.x, this.y, this.size, Math.PI * 2, 0, false);
    //Core.ctx.fillRect(this.x, this.y, 16, 16);
    Core.ctx.closePath();
    Core.ctx.stroke();
    Core.ctx.fill();

  }

  updateLocked(){

    this.size += (16 - this.size) * 0.2;

    let enemy = Core.maps[Math.floor(this.screen.y / 384) % Core.maps.length].enemies[this.IDenemyLocked];

    this.x = (enemy.x - Core.camera.x) + (enemy.width / 2);
    this.y = (enemy.y - Core.camera.y) + (enemy.height / 2);

    if(distance(enemy.x + (enemy.width / 2), enemy.y + (enemy.height / 2), this.screen.x, this.screen.y) > 14)  {
      this.state = 'Free';
    }

  }

  draw(){

    this['draw'+this.state]();

  }

  update(){

    this['update'+this.state]();

  }


}