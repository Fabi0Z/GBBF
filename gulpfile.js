var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var ts = require('gulp-typescript');
var merge = require('merge2');

// TypeScript project declaration
var tsProject = ts.createProject({
    declaration: true
});

// Compile TypeScript
gulp.task('scripts', function() {
    return gulp.src('ts/*.ts')
        .pipe(tsProject())
        .pipe(gulp.dest('app/js'));
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'scripts'], function() {

  browserSync.init({
    server: "./app"
  });

  gulp.watch("scss/*.scss", ['sass']);
  gulp.watch("ts/*.ts", ['scripts']);
  gulp.watch("app/*.html").on('change', browserSync.reload);
});

// Compile SCSS
gulp.task('css:compile', function() {
  return gulp.src('scss/**/*.scss')
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('app/css'))
});

// Minify CSS
gulp.task('css:minify', ['css:compile'], function() {
  return gulp.src([
      'app/css/*.css',
      '!app/css/*.min.css'
    ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream());
});

// CSS
gulp.task('sass', ['css:compile', 'css:minify']);

gulp.task('default', ['serve']);
