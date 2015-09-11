const gulp = require('gulp');
const replace = require('gulp-replace');
const config = require('../config');
const dist = config.dir.dist;

gulp.task('replace', ['htmlbuild'], function(){
  gulp.src(dist + '/js/main.min.js')
    .pipe(replace(/nextPosition/g, 'np'))
    .pipe(replace(/checkBulletCollisionAgainstPlayer/g, 'CBCAP'))
    .pipe(replace(/checkBulletCollisionAgainstEnemy/g, 'CBCAE'))
    .pipe(replace(/testPolygonPolygon/g, 'tPP'))
    .pipe(replace(/Core/g, 'C'))
    .pipe(replace(/camera/g, 'Ca'))
    //.pipe(replace(/mouse/g, 'ma'))
    .pipe(replace(/velocity/g, 'v'))
    .pipe(replace(/bulletCollisionResponse/g, 'bCR'))
    .pipe(replace(/normalizedMapY/g, 'nMY'))
    .pipe(replace(/normalizedMapHeight/g, 'nMH'))
    .pipe(gulp.dest(dist + '/js/'));
});