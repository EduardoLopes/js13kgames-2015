const gulp = require('gulp');
const closureCompiler = require('gulp-closure-compiler');
const config = require('../config');
const dist = config.dir.dist;


gulp.task('closure-compiler', ['htmlbuild'], function() {
  return gulp.src(dist + '/js/main.js')
    .pipe(closureCompiler({
      compilerPath: 'node_modules/closure-compiler/lib/vendor/compiler.jar',
      fileName: 'main.min.js',
      compilerFlags: {
        compilation_level: 'ADVANCED_OPTIMIZATIONS',
        // .call is super important, otherwise Closure Library will not work in strict mode.
        output_wrapper: '(function(){%output%}).call(window);',
        warning_level: 'VERBOSE',
        language_in: 'ECMASCRIPT5_STRICT'
      }
    }))
    .pipe(gulp.dest(dist + '/js/'));
});