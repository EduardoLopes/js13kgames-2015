import {Rectangle} from './rectangle';
import {Vector2} from './vector2';

export class Camera extends Rectangle{
  constructor(x, y, w, h){
    super(x, y, w, h);

    this.follow = null;
    this.cameraMaxY = 0;
    this.normalizedByMapHeight = 0;
    this.normalizedMapY = 0;
    this._shake = 0;
    this._shakeDirection = 0;
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

  shake(d, f){

    this._shakeDirection = d;

    if(d){
      this._shake = f;
    } else {
      this._shake = f;
    }

  }

  update(){
    //this.y += 1;

/*    this._shake = Math.random() * 10;
    this._shake.y = Math.random() * 10;*/

    if(this.follow != null){
      this.y += ((this.follow.y) - (this.y + this.h / 3)) * 0.05 >> 0;
    }

    this.x += ((this._shake) - (this.x)) * 0.5 >> 0;

    if(this.y > this.cameraMaxY){
      this.cameraMaxY = this.y;
    }

    this.normalizedMapY = this.y / 384 >> 0;
    this.normalizedMapHeight = (this.y + this.h) / 384 >> 0;

    if(this._shakeDirection){
      if(this._shake <= 0){
        this._shake = 0;
        this.x = 0;
      } else {
        this._shake += (-1 - this._shake) * 0.4;
      }
    } else {
      if(this._shake >= 0){
        this._shake = 0;
        this.x = 0;
      } else {
        this._shake += (1 - this._shake) * 0.4;
      }
    }

    this.y = Math.max(this.cameraMaxY, this.y);

  }
}
