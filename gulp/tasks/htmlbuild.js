const gulp = require('gulp');
const es = require('event-stream');
const htmlbuild = require('gulp-htmlbuild');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssmin = require('gulp-cssmin');
const uncss = require('gulp-uncss');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cssbeautify = require('gulp-cssbeautify');
const config = require('../config');

const app = config.dir.app;
const dist = config.dir.dist;

var gulpSrc = function (opts) {
  var paths = es.through();
  var files = es.through();

  paths.pipe(es.writeArray(function (err, srcs) {

    return gulp.src(srcs, { cwd: app }).pipe(files);

  }));

  return es.duplex(paths, files);
};

var jsBuild = es.pipeline(
  concat('main.js'),
  uglify(),
  gulp.dest(dist + '/js')
);

var cssBuild = es.pipeline(
  uncss({ html: [app + '/index.html'] }),
  autoprefixer({
    browsers: ['last 2 versions']
  }),
  //cssbeautify(),
  concat('main.css'),
  //gulp.dest(dist + '/css'),
  rename('main.min.css'),
  cssmin(),
  gulp.dest(dist + '/css')
);

gulp.task('htmlbuild', ['clean', 'browserify:build'], function(cb) {

  return gulp.src([app + '/index.html'])
    .pipe(htmlbuild({

      js: htmlbuild.preprocess.js(function (block) {

        block.pipe(gulpSrc())
          .pipe(jsBuild);

        block.end('js/main.min.js');

      }),

      css: htmlbuild.preprocess.css(function (block) {

        block.pipe(gulpSrc())
          .pipe(cssBuild);

        block.end('css/main.min.css');

      }),
      //remove livereload scripe
      remove: function (block) {
        block.end();
      }
    }))
    .pipe(gulp.dest(dist));

});
