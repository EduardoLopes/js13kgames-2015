(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _engineVector2 = require('../engine/vector2');

var Game = (function () {
  function Game(options) {
    _classCallCheck(this, Game);

    console.log(options, options.screen, '-');

    this.screen = {
      size: options.screen.size.copy(),
      center: options.screen.center
    };

    this.containerID = options.containerID;

    this.setUp();
  }

  _createClass(Game, [{
    key: 'setUp',
    value: function setUp() {

      this.container = document.getElementById(this.containerID);
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');

      this.canvas.width = this.screen.size.x;
      this.canvas.height = this.screen.size.y;

      this.container.style.width = this.screen.size.x + 'px';
      this.container.style.height = this.screen.size.y + 'px';

      if (this.screen.center) {
        this.container.classList.add('center');
      }

      this.container.appendChild(this.canvas);
    }
  }]);

  return Game;
})();

exports.Game = Game;

},{"../engine/vector2":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector2 = (function () {
  function Vector2() {
    var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    _classCallCheck(this, Vector2);

    this.x = x;
    this.y = y;
  }

  _createClass(Vector2, [{
    key: "copy",
    value: function copy() {
      return new Vector2(this.x, this.y);
    }
  }]);

  return Vector2;
})();

exports.Vector2 = Vector2;

},{}],3:[function(require,module,exports){
'use strict';

var _engineGame = require('../engine/game');

var _engineVector2 = require('../engine/vector2');

var width = 480;
var height = 800;
var center = true;
var containerID = 'container';

var game = new _engineGame.Game({
  screen: {
    size: new _engineVector2.Vector2(480 / 2, 800 / 2),
    center: true
  },
  containerID: 'container'
});

},{"../engine/game":1,"../engine/vector2":2}]},{},[3]);