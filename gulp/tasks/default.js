var gulp = require('gulp');

gulp.task('default', ['server', 'browserify']);

gulp.task('dist', ['htmlbuild', 'RegPack', 'post-clean']);
