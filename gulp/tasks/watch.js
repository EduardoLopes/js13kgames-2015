var gulp = require('gulp');
var config = require('../config');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var app = config.dir.app;

// watch files for changes and reload
gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: './',
        },
        open: true,
        startPath: '/app',
        injectChanges: true,
    });

  gulp.watch(['index.html', 'bundle.js', 'css/**/*.css'], {cwd: 'app'}).on('change', reload);


});
