import {Tilemap} from '../engine/tilemap';
import {Random} from '../engine/random';
import {Enemy} from './enemy';
import {Core} from '../engine/core';
import {MAPS} from './maps';

export class MapPiece extends Tilemap{
  constructor(options){

    super(options);

    this.enemies = [];

    this.initEnemies();
    this.resetEnemies();

  }

  initEnemies(){

    for (let i = 0; i < 3; i++) {

      let emptyTile = this.findEmptyTile();

      this.enemies[i] = new Enemy({
        x: (emptyTile.x * 16) + this.x,
        y: (emptyTile.y * 16) + this.y,
        width: 12,
        height: 12
      });

    };

  }

  findEmptyTile(){

    let random_x = Random.int(0, this.cols - 1);
    let random_y = Random.int(0, this.rows - 1);

    if(this.tileIsSolid(random_x * 16, random_y * 16) == false){
      return {x: random_x, y: random_y};
    } else {
      if(Random.int(0, 1) == 0){
        return {x: random_x, y: Random.int(0, 1)};
      } else {
        return {x: random_x, y: Random.int(this.rows - 2, this.rows - 1)};
      }

    }

  }

  onResetGame(x, y){
    this.x = x;
    this.y = y;

    if(this.y == 0) return;

    this.resetEnemies();
  }

  resetEnemies(){
    let randInt = Random.int(0, MAPS.length - 1);

    this.map = MAPS[randInt].map;
    this.mapImage.src = MAPS[randInt].src;
    Core.lastMapIndex = 0;

    for (let i = 0; i < this.enemies.length; i++) {

      let emptyTile = this.findEmptyTile();

      this.enemies[i].x = (emptyTile.x * 16) + this.x;
      this.enemies[i].y = (emptyTile.y * 16) + this.y;
      this.enemies[i].active = true;
      this.enemies[i].visible = true;
      this.enemies[i].bullet.setDead();
      this.enemies[i].radius = (this.enemies[i].width / 2) + 2;

      if(this.y == 0){
        this.enemies[i].radius = 0;
        this.enemies[i].active = false;
        this.enemies[i].visible = false;
      }

    };

  }

  draw(){
    super.draw();

    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].draw();
    };

  }

  update(){
    super.update();

    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].update();
    };

    if(Core.camera.y > this.height + this.y){

      this.y += (this.height * MAPS.length);

      this.resetEnemies();
    }

  }
}