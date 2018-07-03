var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var ts = require('gulp-typescript');
var uglify = require('gulp-uglify');

// TypeScript project declaration
var tsProject = ts.createProject({
  declaration: true
});

// Copy JS
gulp.task('js:copy', function() {
  gulp.src('scripts/**/*.js')
    .pipe(gulp.dest('app/js'));
});

// Compile TypeScript
gulp.task('js:compile', function() {
  return gulp.src('scripts/**/*.ts')
    .pipe(tsProject())
    .pipe(gulp.dest('app/js'));
});

// Minify JavaScript
gulp.task('js:minify', function() {
  gulp.src([
      'app/js/*.js',
      '!app/js/min/*'
    ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('app/js/min'))
})

// Static Server + watching scss/html/ts files
gulp.task('serve', ['style', 'scripts'], function() {

  browserSync.init({
    server: "./app"
  });

  gulp.watch(['style/*.scss', 'style/*.css'], ['sass']);
  gulp.watch(['scripts/*.ts', 'scripts/*.js'], ['scripts']);
  gulp.watch("app/*.html").on('change', browserSync.reload);
});

// Copy CSS
gulp.task('css:copy', function() {
  gulp.src('style/**/*.css')
    .pipe(gulp.dest('app/css'));
});

// Compile SCSS
gulp.task('scss:compile', function() {
  return gulp.src('style/**/*.scss')
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('app/css'))
});

// Minify CSS
gulp.task('css:minify', ['css:compile'], function() {
  return gulp.src([
      'app/css/*.css',
      '!app/css/min/*',
    ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('app/css/min'))
    .pipe(browserSync.stream());
});

// CSS
gulp.task('style', ['scss:compile', 'css:minify', 'css:copy']);

// TypeScript
gulp.task('scripts', ['js:compile', 'js:minify', 'js:copy']);

// Default
gulp.task('default', ['serve']);
