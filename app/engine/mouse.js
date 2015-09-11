import {Core} from './core';
import {Vector2} from './vector2';
import {BasicObject} from './BasicObject';

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

  draw(){

    Core.ctx.strokeStyle = '#181818';
    Core.ctx.fillStyle = 'rgba(255,255,255,0.2)';
    Core.ctx.beginPath();
    Core.ctx.arc(this.x, this.y, this.size, Math.PI * 2, 0, false);
    //Core.ctx.fillRect(this.x, this.y, 16, 16);
    Core.ctx.closePath();
    Core.ctx.stroke();
    Core.ctx.fill();
  }

  update(){

    if(this.justPressed){
      this.size = 2;
    }


      this.size += (this.maxSize - this.size) * 0.2;


  }


}