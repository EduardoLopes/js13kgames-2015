import {Core} from './core';

export function angle(ax, ay, bx, by) {

    var dx = (bx + Core.camera.x) - (ax + Core.camera.x);
    var dy = (by + Core.camera.y) - (ay + Core.camera.y);

    return Math.atan2(dy, dx);
};