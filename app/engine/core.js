export const Core = {};
const PF = require('pathfinding');

Core.ctx = null;
Core.canvas = null;
Core.screen = null;
Core.camera = null;
Core.keys = [];
Core.maps = [];
Core.mouse = [];
Core.player = null;
Core.pathfinderGrid = new PF.Grid(15, 48);
Core.pathfinder = new PF.AStarFinder();
Core.resetGame = null;
Core.pause = false;
Core.highScore = 0;
Core.timeHolder = 1;
Core.lastMapIndex = 0; //this is important for the pathfinder grid system

Core.colors = {
  b: '#21313E', //background
  rb: 'rgba(33,49,62, 0.7)', //rbg background color opacity
  bm: '#BF9FD4', //background map
  w: '#F6BAF7', //words
  p: '#268073', //player
  pb: '#20575F', //player bullet
  e: '#793E1D', //player
  eb: '#4D1F14' //player
}