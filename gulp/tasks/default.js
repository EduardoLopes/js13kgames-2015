var gulp = require('gulp');

gulp.task('default', ['server', 'browserify']);

gulp.task('dist', ['htmlbuild', 'closure-compiler', 'post-clean', ]);
