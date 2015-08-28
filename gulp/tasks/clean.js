const gulp = require('gulp');
const del = require('del');
const config = require('../config');

const dist = config.dir.dist;
const zipFileName = config.zipFileName;

gulp.task('clean', function(cb) {

  return del([dist + '/**/*'], cb);

});

gulp.task('post-clean', ['RegPack'], function(cb) {

  return del([dist + '/js/main.js'], cb);

});

gulp.task('delete-zip', function(cb) {

  return del([dist +'/'+ zipFileName], cb);

});