import {Core} from './core';
import {Vector2} from '../engine/vector2';

export class Mouse{
  constructor(x, y){
    this.x = 0;
    this.y = 0;
    this.screen = new Vector2(0, 0);
    this.lastClick = new Vector2(32, 16);
    this.down = false;
    this.rect = null;

    Core.canvas.addEventListener('mousemove',function(e){

      this.setMousePosition(e);

    }.bind(this));

    Core.canvas.addEventListener('mousedown',function(e){

      this.setMousePosition(e);
      this.down = true;

    }.bind(this));

    Core.canvas.addEventListener('mouseup',function(e){

      this.setMousePosition(e);
      this.lastClick.x = this.screen.x;
      this.lastClick.y = this.screen.y;
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
}