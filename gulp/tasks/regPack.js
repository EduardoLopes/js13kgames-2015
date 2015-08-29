const gulp = require('gulp');
const rename = require('gulp-rename');
const run = require('gulp-run');
const config = require('../config');

const dist = config.dir.dist;

const RegPackCommand = 'node ./RegPack/regPack.js '+ dist + '/js/main.closure.js';

gulp.task('RegPack', ['htmlbuild', 'closure-compiler'], function(){
  return gulp.src('.')
  .pipe(run( RegPackCommand, { verbosity: 1 }))
  .pipe(rename('main.min.js'))
  .pipe(gulp.dest(dist + '/js'));
});