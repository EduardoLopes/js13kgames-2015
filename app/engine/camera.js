import {Rectangle} from './rectangle';

export class Camera extends Rectangle{
  constructor(x, y, w, h){
    super(x, y, w, h);

    this.follow = null;
    this.cameraMaxY = 0;
    this.normalizedByMapHeight = 0;
    this.normalizedMapY = 0;
  }

  reset(){
    this.cameraMaxY = 0;
    this.normalizedByMapHeight = 0;
    this.normalizedMapY = 0;
    this.x = 0;
    this.y = 0;
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

    this.normalizedMapY = this.y / 384 >> 0;
    this.normalizedMapHeight = (this.y + this.h) / 384 >> 0;

  }
}
