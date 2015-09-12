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