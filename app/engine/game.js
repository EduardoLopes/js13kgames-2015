import {Vector2} from '../engine/vector2';

export class Game{
  constructor(options){

    console.log(options, options.screen);

    this.screen = {
      size: new Vector2(options.screen.size.x, options.screen.size.y),
      center: options.screen.center
    };

    this.containerID = options.containerID;

    console.log(this);

    this.setUp();

  }

  setUp(){

    this.container = document.getElementById(this.containerID);
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = this.screen.size.x;
    this.canvas.height = this.screen.size.y;

    this.container.style.width = this.screen.size.x+'px';
    this.container.style.height = this.screen.size.y+'px';

    if(this.screen.center){
      this.container.classList.add('center');
    }

    this.container.appendChild(this.canvas);

  }
}