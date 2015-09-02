import {Game} from '../engine/game';
import {Vector2} from '../engine/vector2';
import {Tilemap} from '../engine/tilemap';
import {MAPS} from './maps';

class NewGame extends Game{
  constructor(options){
    super(options);

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

  }

  update(){
    super.update();

    this.map.update();
    this.map2.update();
    this.map3.update();
    this.map4.update();


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