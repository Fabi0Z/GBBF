var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var ts = require('gulp-typescript');
var del = require('del');
var uglifyes = require('uglify-es');
var composer = require('gulp-uglify/composer');
var uglify = composer(uglifyes, console);

// TypeScript project declaration
var tsProject = ts.createProject({
  declaration: true
});

// Initialize Project (Copy JavaScript from various modules)
gulp.task('init', function() {
  // Popper JS
  gulp.src('node_modules/popper.js/dist/popper.min.js')
    .pipe(gulp.dest('app/js/min'));
  // jQuery
  gulp.src('node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('app/js/min'));
  // Bootstrap JS
  gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js')
    .pipe(gulp.dest('app/js/min'));
});

// Delete JS
gulp.task('js:delete', function() {
  return del([
    'app/js/**/*',
  ]);
});

// Copy JS
gulp.task('js:copy', function() {
  gulp.src('scripts/**/*.js')
    .pipe(gulp.dest('app/js'));
});

// Compile TypeScript
gulp.task('ts:compile', function() {
  return gulp.src('scripts/**/*.ts')
    .pipe(tsProject())
    .pipe(gulp.dest('app/js'));
});

// Minify JavaScript
gulp.task('js:minify', ['ts:compile'], function() {
  return gulp.src([
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

  gulp.watch(['style/*.scss', 'style/*.css'], ['style']);
  gulp.watch(['scripts/*.ts', 'scripts/*.js'], ['scripts']);
  gulp.watch("app/*.html").on('change', browserSync.reload);
});

// Delete CSS
gulp.task('css:delete', function() {
  return del([
    'app/css/**/*',
  ]);
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
gulp.task('css:minify', ['scss:compile'], function() {
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
gulp.task('style', ['css:delete', 'scss:compile', 'css:copy', 'css:minify']);

// TypeScript
gulp.task('scripts', ['js:delete', 'ts:compile', 'js:copy', 'js:minify']);

// Default
gulp.task('default', ['serve']);
