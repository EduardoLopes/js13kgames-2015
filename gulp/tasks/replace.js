const gulp = require('gulp');
const replace = require('gulp-replace');
const config = require('../config');
const dist = config.dir.dist;

gulp.task('replace', ['htmlbuild'], function(){
  gulp.src(dist + '/js/main.min.js')
    .pipe(replace(/nextPosition/g, '_a'))
    .pipe(replace(/checkBulletCollisionAgainstPlayer/g, '_b'))
    .pipe(replace(/checkBulletCollisionAgainstEnemy/g, '_c'))
    .pipe(replace(/testPolygonPolygon/g, '_d'))
    .pipe(replace(/Core/g, '_e'))
    .pipe(replace(/camera/g, '_f'))
    //.pipe(replace(/mouse/g, 'ma'))
    .pipe(replace(/velocity/g, '_g'))
    .pipe(replace(/bulletCollisionResponse/g, '_h'))
    .pipe(replace(/normalizedMapY/g, '_i'))
    .pipe(replace(/normalizedMapHeight/g, '_j'))
    .pipe(replace(/options/g, '_k'))
    .pipe(replace(/ownerReference/g, '_l'))
    .pipe(replace(/collisionResponse/g, '_m'))
    .pipe(replace(/player/g, '_n'))
    .pipe(replace(/reset/g, '_o'))
    .pipe(replace(/Random/g, '_p'))
    .pipe(replace(/enemies/g, '_q'))
    .pipe(replace(/bullet/g, '_r'))
    .pipe(replace(/ctx/g, '_s'))
    .pipe(replace(/vector/g, '_t'))
    .pipe(replace(/vector2/g, '_u'))
    .pipe(gulp.dest(dist + '/js/'));
});