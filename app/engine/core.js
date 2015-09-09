export const Core = {};
const ndarray = require('ndarray');
const createPlanner = require('l1-path-finder');

Core.ctx = null;
Core.canvas = null;
Core.screen = null;
Core.camera = null;
Core.keys = [];
Core.maps = [];
Core.mouse = [];
Core.pathfinderMap = ndarray([],
[24, 30]);