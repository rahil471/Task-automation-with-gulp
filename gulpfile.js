var sass = require('gulp-sass');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

gulp.task('lint', function() {
  return gulp.src('./src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('scss', function() {
    gulp.src('./src/assets/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/assets/stylesheets/'));
});

gulp.task('scripts', function() {
	return gulp.src('./src/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./public'));
});

gulp.task('copy', function() {
    gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./public'))
});

gulp.task('build', ['lint', 'scss', 'scripts', 'copy'], function(){
	console.log('Build complete');
})

gulp.task('browser-sync', ['build'], function() {
    browserSync.init({
        server: {
            baseDir: "./public",
			// The key is the url to match
			// The value is which folder to serve (relative to your current working directory)
			routes: {
				"/bower_components": "bower_components"
			}
        },
		browser:"firefox"
    });
});

gulp.task('default', ['browser-sync'], function(){
	gulp.watch("./src/**/*.*", ["build"]);
	gulp.watch("./public/**/*.*").on('change', browserSync.reload);
})