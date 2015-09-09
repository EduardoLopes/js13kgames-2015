import {Core} from './core';
import {Vector2} from './vector2';
const SAT = require('./sat/SAT.js');

export class BasicObject{
  constructor(options){

    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.active = options.active || true;
    this.visible = options.visible || true;

    this.shape = new SAT.Box(new SAT.Vector(this.x, this.y), this.width, this.height).toPolygon();

  }

  draw(){



  }

  update(){



  }
}