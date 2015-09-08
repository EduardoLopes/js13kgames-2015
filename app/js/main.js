import {Game} from '../engine/game';
import {Core} from '../engine/core';
import {Vector2} from '../engine/vector2';
import {Tilemap} from '../engine/tilemap';
import {BasicObject} from '../engine/BasicObject';
import {MAPS} from './maps';
import {Player} from './player';

const SAT = require('sat');

class NewGame extends Game{
  constructor(options){
    super(options);

    this.player = new Player({
        x: 32,
        y: 16,
        width: 16,
        height: 16
    });

    this.map = new Tilemap({
      map: MAPS[0],
      width: 240,
      height: 384,
      rows: 24,
      cols: 15,
      x: 0,
      y: 0
    });

    this.map2 = new Tilemap({
      map: MAPS[1],
      width: 240,
      height: 384,
      rows: 24,
      cols: 15,
      x: 0,
      y: 384
    });

    this.map3 = new Tilemap({
      map: MAPS[2],
      width: 240,
      height: 384,
      rows: 24,
      cols: 15,
      x: 0,
      y: 384 * 2
    });

    this.map4 = new Tilemap({
      map: MAPS[3],
      width: 240,
      height: 384,
      rows: 24,
      cols: 15,
      x: 0,
      y: 384 * 3
    });

  }

  draw(){

    super.draw();

    this.map.draw();
    this.map2.draw();
    this.map3.draw();
    this.map4.draw();

    this.player.draw();

  }

  checkTileCollision(w, h){

    if(this.map.tileIsSolid(w * 16, h * 16)){

      Core.ctx.fillStyle = '#ffe88d';
      Core.ctx.fillRect(w * 16, h * 16, 16, 16);

      this.player.shape.pos.x = this.player.nextPosition.x;
      this.player.shape.pos.y = this.player.nextPosition.y;

      var box2 = new SAT.Box(new SAT.Vector(w * 16, h * 16), 16, 16).toPolygon();
      var response = new SAT.Response();
      var collided = SAT.testPolygonPolygon(this.player.shape, box2, response);

      this.player.nextPosition.x -= response.overlapV.x;
      this.player.nextPosition.y -= response.overlapV.y;

    }

  }

  update(){
    super.update();

    this.map.update();
    this.map2.update();
    this.map3.update();
    this.map4.update();

    this.player.update();

    let minX = Math.floor(((this.player.nextPosition.x)) / 16);
    let maxX = Math.floor(((this.player.nextPosition.x) + 16) / 16);
    let minY = Math.floor(((this.player.nextPosition.y)) / 16);
    let maxY = Math.floor(((this.player.nextPosition.y) + 16) / 16);

    if(this.player.goingUpOrDown == 'up'){

      for (let h = maxY; h >= minY; h--) {
        for (let w = maxX; w >= minX; w--) {

          this.checkTileCollision(w, h);

        }
      }

    } else if(this.player.goingUpOrDown == 'down'){

      for (let h = minY; h <= maxY; h++) {
        for (let w = minX; w <= maxX; w++) {

          this.checkTileCollision(w, h);

        }
      }

    }

    this.player.x = this.player.nextPosition.x;
    this.player.y = this.player.nextPosition.y;

  }

}

const game = new NewGame({
  //Hack so the RegPack compiler can work
  //Thanks to @Siorki
  //https://twitter.com/Siorki/status/637386161544163329
  name: '-',
  screen: {
    size: new Vector2(240, 384),
    center: true,
    background: '#ccc'
  },
  containerID: 'container'
});