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

    Core.maps = [];
    this.lastMapIndex = 0;

    this.player = new Player({
        x: 32,
        y: 16,
        width: 16,
        height: 16
    });

    Core.camera.setObjectToFollow(this.player);

    this.initMaps();

  }

  initMaps(){

    for (let i = 0; i < MAPS.length; i++) {

      Core.maps[i] = new Tilemap({
        map: MAPS[i],
        width: 240,
        height: 384,
        rows: 24,
        cols: 15,
        x: 0,
        y: 384 * i
      });

    };

    for (let i = 0; i <= 2; i++) {

        for(let h = 0; h < Core.maps[i % Core.maps.length].rows; ++h) {
          for(let w = 0; w < Core.maps[i % Core.maps.length].cols; ++w) {

            let index = Core.maps[i % Core.maps.length].cols * h + w;

            Core.pathfinderMap.set(w, h, Core.maps[i % Core.maps.length].map[index]);

          }
        }

    };

  }

  draw(){

    super.draw();

    for (let i = Core.camera.normalizedMapY; i <= Core.camera.normalizedMapHeight; i++) {
      Core.maps[i % Core.maps.length].draw();
    };

    this.player.draw();

  }

  update(){
    super.update();

    if(this.lastMapIndex != Core.camera.normalizedMapY){
      this.lastMapIndex = Core.camera.normalizedMapY;

      for (let i = Core.camera.normalizedMapY; i <= Core.camera.normalizedMapHeight; i++) {

        for(let h = 0; h < Core.maps[i % Core.maps.length].rows; ++h) {
          for(let w = 0; w < Core.maps[i % Core.maps.length].cols; ++w) {

            let index = Core.maps[i % Core.maps.length].cols * h + w;

            Core.pathfinderMap.set(w, h, Core.maps[i % Core.maps.length].map[index]);

          }
        }

      };

    }

    for (let i = Core.camera.normalizedMapY; i <= Core.camera.normalizedMapHeight; i++) {
      Core.maps[i % Core.maps.length].update();
    };

    this.player.update();

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