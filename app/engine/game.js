import {Core} from './core';
import {Vector2} from './vector2';
import {Camera} from './camera';
import {Mouse} from './mouse';
import {QuadTree} from './quadtree';
import {InitKeys} from './keys';

export class Game{
  constructor(options){

    this.screen = {
      size: new Vector2(options.screen.size.x, options.screen.size.y),
      center: options.screen.center,
      background: options.screen.background
    };
    this.containerID = options.containerID;
    this.setUp();

    Core.screen = this.screen;

  }

  setUp(){

    this.container = document.getElementById(this.containerID);
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = this.screen.size.x;
    this.canvas.height = this.screen.size.y;

    this.container.style.width = this.screen.size.x+'px';
    this.container.style.height = this.screen.size.y+'px';

    this.container.style.background = this.screen.background;

    if(this.screen.center){
      this.container.classList.add('center');
    }

    this.container.appendChild(this.canvas);

    Core.canvas = this.canvas;
    Core.ctx = this.ctx;
    Core.camera = new Camera(0,0,this.screen.size.x, this.screen.size.y);
    Core.mouse = new Mouse();
    InitKeys();

    requestAnimationFrame(this.step.bind(this));

  }

  draw(){

    this.ctx.clearRect(0,0, this.screen.size.x, this.screen.size.y);

  }

  update(){

    Core.camera.update();

  }

  step(){

    this.draw();
    this.update();

    requestAnimationFrame(this.step.bind(this));

  }
}