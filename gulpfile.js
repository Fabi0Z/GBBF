var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

  browserSync.init({
    server: "./app"
  });

  gulp.watch("scss/*.scss", ['sass']);
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
