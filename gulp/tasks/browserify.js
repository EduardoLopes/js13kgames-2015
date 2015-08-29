var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var babelify = require("babelify");
var config = require('../config');
var errorify = require('errorify');

var app = config.dir.app;

 var browserify_instance = browserify({
    cache: {},
    packageCache: {},
    fullPaths: true,
    debug: true
  })
  .transform(babelify)
  .plugin(errorify)
  .require(app + '/js/main.js', { entry: true });

  var bundler = watchify(browserify_instance);

gulp.task('browserify', function() {

  bundler.on('update', rebundle);

  bundler.on('log', function (msg) {
    console.log(msg);
  });

  function rebundle() {

    return bundler
    .bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(app + '/'));
  }

  return rebundle();

});

gulp.task('browserify:build', function() {

  var bundler = browserify()
  .transform(babelify)
  .plugin(errorify)
  .require(app + '/js/main.js', { entry: true });

  return bundler.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(app + '/'));

});

