import {Game} from '../engine/game';
import {Vector2} from '../engine/vector2';

const game = new Game({
  //Hack so the RegPack compiler can work
  //Thanks to @Siorki
  //https://twitter.com/Siorki/status/637386161544163329
  name: '-',
  screen: {
    size: new Vector2(480, 800),
    center: true
  },
  containerID: 'container'
});