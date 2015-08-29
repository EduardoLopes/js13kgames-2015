const gulp = require('gulp');
const zip = require('gulp-zip');
const size = require('gulp-size');
const notify = require('gulp-notify');

const config = require('../config');
const dist = config.dir.dist;
const zipFileName = config.zipFileName;
const maxFileSize = 13 * 1024;

gulp.task('zip', ['delete-zip'], function(){
  const s = size({showFiles: true});
  return gulp.src(dist+'/**/*')
        .pipe(zip(zipFileName))
        .pipe(s)
        .pipe(notify({
            onLast: true,
            message: function () {

              if(s.size > maxFileSize){
                console.log('ERROR:', 'file is too big:', s.size + ' B');

                return 'You need to remove:'+ (s.size - maxFileSize) + ' B';

              }

              console.log('File size:', s.size + ' B');
              return 'You can still use: ' + (maxFileSize - s.size) + ' B';

            }
        }))
        .pipe(gulp.dest(dist));
});
