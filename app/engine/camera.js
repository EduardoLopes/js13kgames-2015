import {Rectangle} from './rectangle';
const SAT = require('sat');

export class Camera extends Rectangle{
  constructor(x, y, w, h){
    super(x, y, w, h);

    this.follow = null;
  }

  setObjectToFollow(object){
    this.follow = object;
  }

  update(){
    //this.y += 1;

    if(this.follow != null){
      this.y += (this.follow.y - (this.y + this.h / 2)) * 0.05 >> 0;
    }


  }
}
