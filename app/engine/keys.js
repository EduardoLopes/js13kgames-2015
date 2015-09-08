import {Core} from './core';

export function InitKeys(){

  document.body.addEventListener('keydown', function(e){

    Core.keys[e.keyCode] = true;

  }, false);

  document.body.addEventListener('keyup', function(e){

    Core.keys[e.keyCode] = false;

  }, false);

}
