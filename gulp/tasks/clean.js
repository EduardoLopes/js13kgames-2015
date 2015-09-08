const gulp = require('gulp');
const del = require('del');
const config = require('../config');

const dist = config.dir.dist;
const zipFileName = config.zipFileName;

gulp.task('clean', function(cb) {

  return del([dist + '/**/*'], cb);

});

gulp.task('post-clean', ['closure-compiler'], function(cb) {

  return del([dist + '/js/main.js', dist + '/js/main.closure.js'], cb);

});

gulp.task('delete-zip', function(cb) {

  return del([dist +'/'+ zipFileName], cb);

});