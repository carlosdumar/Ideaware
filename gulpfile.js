var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    stylus = require('gulp-stylus'),
    nib = require('nib'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    htmlmin = require('gulp-htmlmin'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    cors = require('cors');

var config = {
  styles: {
    main: './src/styles/main.styl',
    watch: './src/styles/**/*.styl',
    output: './build/assets/stylesheets'
  },
  html: {
    main: './src/*.html',
    watch: './src/*.html',
    output: './build'
  },
  js: {
    main: './src/main.js',
    watch: './src/*.js',
    output: './build/assets/javascript'
  }
}
gulp.task('server', function() {
  gulp.src('./build')
    .pipe(webserver({
      host: 'localhost',
      port: 8080,
      livereload: true
    }));
})
gulp.task('build:css', function() {
  gulp.src(config.styles.main)
    .pipe(stylus({
      use: nib(),
      'include css': true
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest(config.styles.output));
});
gulp.task('build:js', function() {
  return browserify(config.js.main)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
//    .pipe(uglify())
    .pipe(gulp.dest(config.js.output));
});
gulp.task('build:html', function() {
  gulp.src(config.html.main)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(config.html.output))
});
gulp.task('watch', function() {
  gulp.watch(config.styles.watch, ['build:css']);
  gulp.watch(config.js.watch, ['build:js']);
  gulp.watch(config.html.watch, ['build:html']);
});

gulp.task('build', ['build:css', 'build:js', 'build:html']);

gulp.task('default', ['server', 'watch', 'build']);
