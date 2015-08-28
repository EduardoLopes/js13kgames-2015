var gulp = require('gulp');
var config = require('../config');

var app = config.dir.app;
var dist = config.dir.dist;

gulp.task('copy-images', ['clean'], function(){

  return gulp.src(app + '/img/*.{png,jpg}')
  .pipe(gulp.dest(dist + '/img'));

});

gulp.task('copy-vendors', ['clean'], function(){

  return gulp.src( app + '/js/vendor/*')
  .pipe(gulp.dest( dist + '/js/vendor'));

});

gulp.task('copy-others', ['clean'], function(){

  return gulp.src(config.filesToCopy)
  .pipe(gulp.dest(dist));

});

gulp.task('copy', ['copy-images', 'copy-vendors', 'copy-others']);
