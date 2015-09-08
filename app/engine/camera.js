import {Rectangle} from './rectangle';
const SAT = require('sat');

export class Camera extends Rectangle{
  constructor(x, y, w, h){
    super(x, y, w, h);

    this.follow = null;
    this.cameraMaxY = 0;
  }

  setObjectToFollow(object){
    this.follow = object;
  }

  update(){
    //this.y += 1;

    if(this.follow != null){
      this.y += (this.follow.y - (this.y + this.h / 3)) * 0.05 >> 0;
    }

    if(this.y > this.cameraMaxY){
      this.cameraMaxY = this.y;
    }

    this.y = Math.max(this.cameraMaxY, this.y);


  }
}
