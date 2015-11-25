'use strict';

var gulp       = require('gulp');
var sass       = require('gulp-sass');
var ts         = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var concat     = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify     = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS  = require('gulp-minify-css');
var rename     = require("gulp-rename");
var bump       = require('gulp-bump');

var tsProject = ts.createProject('./src/ts/tsconfig.json');

gulp.task('sass', function () {
  gulp.src('./src/sass/index.scss')
    .pipe(sourcemaps.init())
      .pipe(sass.sync())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/sass'));
});

gulp.task('typescript', function () {
    var tsResult = tsProject.src().pipe(ts(tsProject));
    return tsResult.js.pipe(gulp.dest('./build/ts'));
});

gulp.task('scripts', ['typescript'], function() {
  gulp.src(['./build/ts/ui.js', './src/js/vendor/*.js' ])
    .pipe(concat('./build/js/ui.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(rename("ui.min.js"))
    .pipe(gulp.dest('./js'));
});

// CSS concat, auto-prefix and minify
gulp.task('styles', ['sass'], function() {
  gulp.src(['./build/sass/index.css', './src/css/vendor/*.css'])
    .pipe(concat('./build/css/ui.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(rename("ui.min.css"))
  .pipe(gulp.dest("./css"));
});

gulp.task('bump:major', function(){
  gulp.src(['./bower.json', './component.json', './package.json'])
  .pipe(bump({type:'major'}))
  .pipe(gulp.dest('./'));
});

gulp.task('bump:minor', function(){
  gulp.src(['./bower.json', './component.json', './package.json'])
  .pipe(bump({type:'minor'}))
  .pipe(gulp.dest('./'));
});

gulp.task('bump:patch', function(){
  gulp.src(['./bower.json', './component.json', './package.json'])
  .pipe(bump({type:'minor'}))
  .pipe(gulp.dest('./'));
});

gulp.task('default', ['sass', 'typescript', 'styles', 'scripts'], function () {

});

gulp.task('all', ['default'], function () {

})
