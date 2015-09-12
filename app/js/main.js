import {Game} from '../engine/game';
import {Core} from '../engine/core';
import {Vector2} from '../engine/vector2';
import {MapPiece} from './mapPiece';
import {BasicObject} from '../engine/BasicObject';
import {MAPS} from './maps';
import {Player} from './player';

class NewGame extends Game{
  constructor(options){
    super(options);

    Core.maps = [];
    this.lastMapIndex = 0;

    this.player = new Player({
        x: 64,
        y: 128,
        width: 16,
        height: 16
    });

    this.highScore = 0;

    //global player reference
    Core.player = this.player;

    Core.camera.setObjectToFollow(this.player);

    this.initMaps();

    Core.resetGame = this.resetGame;

  }

  resetGame(){

    Core.mouse.justPressed = false;

    for (let i = 0; i < MAPS.length; i++) {

      Core.maps[i].onResetGame(0, 384 * i);

    }

    this.player.nextPosition.x = 64;
    this.player.nextPosition.y = 128;

    Core.camera.reset();
    this.player.reset();

  }

  initMaps(){

    for (let i = 0; i < MAPS.length; i++) {

      Core.maps[i] = new MapPiece({
        map: MAPS[i],
        width: 240,
        height: 384,
        rows: 24,
        cols: 15,
        x: 0,
        y: 384 * i
      });

    };

    for (let i = 0; i < 2; i++) {

        for(let h = Core.maps[i].rows * i; h < Core.maps[i].rows * (i + 1); ++h) {
          for(let w = 0; w < Core.maps[i].cols; ++w) {

            let index = Core.maps[i].cols * (h - ( Core.maps[i].rows * i )) + w;

            Core.pathfinderGrid.setWalkableAt(w, h, Core.maps[i].map[index] == 0);

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

    if(Core.pause == false){
      Core.ctx.fillStyle = 'rgba(24,24,24,0.7)';
      Core.ctx.fillRect(0, 0, Core.canvas.width, 16);
      Core.ctx.font = '10pt sans-serif';
      Core.ctx.textAlign = 'center';
      Core.ctx.fillStyle = '#eee';
      Core.ctx.fillText('Score: '+Core.camera.y, (Core.canvas.width / 2), 11);
    }

    //path finder grid debug
/*    for(let h = 0; h < Core.pathfinderGrid.nodes.length; ++h) {
      for(let w = 0; w < Core.pathfinderGrid.nodes[h].length; ++w) {

        if(!Core.pathfinderGrid.nodes[h][w].walkable){
          Core.ctx.fillStyle = '#ff006c';
          Core.ctx.fillRect((w * 16) - Core.camera.x, ((h * 16) - Core.camera.y) + Core.camera.normalizedMapY * 384, 16, 16);

        }
        Core.ctx.font = '7px normal'
        Core.ctx.fillStyle = '#000';

        //let norm = (Core.camera.normalizedMapY * 24);

        //Core.ctx.fillText(15 * (h + norm) + w, (w * 16) - Core.camera.x, ((((h + norm) * 16) - Core.camera.y)) + 5, 16, 16);

      }
    }*/

  }

  update(){

    if(Core.pause == true){

      Core.ctx.fillStyle = 'rgba(24,24,24,0.7)';
      Core.ctx.fillRect(0,0,Core.canvas.width, Core.canvas.height);

      Core.ctx.fillStyle = '#eee';
      Core.ctx.font = '12pt sans-serif';
      Core.ctx.textAlign = 'center';
      Core.ctx.fillText('CLICK TO TRY AGAIN', (Core.canvas.width / 2), (Core.canvas.height / 2) - 20);
      Core.ctx.font = '10pt sans-serif';
      Core.ctx.fillText('Score: '+ Core.camera.y, (Core.canvas.width / 2), (Core.canvas.height / 2) + 20);
      Core.ctx.fillText('High Score: '+ Core.highScore, (Core.canvas.width / 2), (Core.canvas.height / 2) + 40);

      if(Core.mouse.justPressed){
        Core.pause = false;
        this.resetGame();
        this.timeHolder = 1;
      }

      return;
    }

    super.update();
    Core.pathfinderDirty = false;
    if(this.lastMapIndex != Core.camera.normalizedMapHeight){
      this.lastMapIndex = Core.camera.normalizedMapHeight;
      let indexPosition = 0;
      Core.pathfinderDirty = true;
      for (let i = Core.camera.normalizedMapY; i <= Core.camera.normalizedMapHeight; i++) {

        for(let h = Core.maps[i % Core.maps.length].rows * indexPosition; h < Core.maps[i % Core.maps.length].rows * (indexPosition + 1); ++h) {
          for(let w = 0; w < Core.maps[i % Core.maps.length].cols; ++w) {

            let index = Core.maps[i % Core.maps.length].cols * (h - ( Core.maps[i % Core.maps.length].rows * indexPosition )) + w;

            Core.pathfinderGrid.setWalkableAt(w, h, Core.maps[i % Core.maps.length].map[index] == 0);

          }
        }

        indexPosition++;

      };

    }

    for (let i = Core.camera.normalizedMapY; i <= Core.camera.normalizedMapHeight; i++) {
      Core.maps[i % Core.maps.length].update();
    };

    this.player.update();

    Core.mouse.justPressed = false;

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