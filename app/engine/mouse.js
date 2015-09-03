import {Core} from './core';

export class Mouse{
  constructor(x, y){
    this.x = x;
    this.y = y;
    let rect;

    Core.canvas.addEventListener('mousemove',function(e){

      rect = Core.canvas.getBoundingClientRect();
      this.x = e.clientX - rect.left;
      this.y = e.clientY - rect.top;

    }.bind(this));

  }
}