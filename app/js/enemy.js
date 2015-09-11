import {BasicObject} from '../engine/BasicObject';
import {Core} from '../engine/core';
import {angle} from '../engine/angle';
import {distance} from '../engine/distance';
import {Bullet} from './bullet';

export class Enemy extends BasicObject{
  constructor(options){

    super(options);

    this.bullet = new Bullet({
      x: 0,
      y: 0,
      width: 8,
      height: 8
    });

    this.goingUpOrDown = 'down';

  }

  draw(){

    this.bullet.draw();

    Core.ctx.fillStyle = '#f52dee';

    if(distance(this.x + (this.width / 2), this.y + (this.height / 2), Core.player.x + (Core.player.width / 2), Core.player.y + (Core.player.height / 2)) < 64 && this.bullet.alive == false){
      Core.ctx.fillStyle = '#2f3e3f';
    }

    Core.ctx.fillRect(this.x - Core.camera.x, this.y - Core.camera.y, this.width, this.height);


  }

  update(){
    //console.log(Core.mouse.screen);
/*    if(distance(this.x, this.y, Core.mouse.screen.x - Core.camera.x, Core.mouse.screen.y - Core.camera.y) < 20){
      console.log('a');
    }
*/
    this.bullet.update();

    if(distance(this.x + (this.width / 2), this.y + (this.height / 2), Core.player.x + (Core.player.width / 2), Core.player.y + (Core.player.height / 2)) < 64 && this.bullet.alive == false){

      this.bullet.angle = angle(this.x + (this.width / 2), this.y + (this.height / 2), Core.player.x + (Core.player.width / 2), Core.player.y + (Core.player.height / 2));
      this.bullet.nextPosition.x = this.x + (4);
      this.bullet.nextPosition.y = this.y + (4);

      this.bullet.setAlive();

    }

  }
}