import {Core} from '../engine/core';

export function drawCircle(x, y, radius, color){
  Core.ctx.fillStyle = color;
  Core.ctx.beginPath();
  Core.ctx.arc(x, y, radius,0, Math.PI * 2, false);
  Core.ctx.closePath();
  Core.ctx.fill();
}

export function drawLine(mx, my, lx, ly, color){
  Core.ctx.strokeStyle = color;
  Core.ctx.beginPath();
  Core.ctx.moveTo(mx, my);
  Core.ctx.lineTo(lx, ly);
  Core.ctx.closePath();
  Core.ctx.stroke();
}