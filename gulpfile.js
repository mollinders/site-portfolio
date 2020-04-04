let gulp = require('gulp'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	browserSync = require('browser-sync'),
	autoprefixer = require('gulp-autoprefixer'),
	del = require('del');

gulp.task('scss', function() {
	return gulp.src('node_modules/normalize.css/normalize.css')
	.pipe(rename('_libs.scss'))
	.pipe(gulp.dest('src/scss/'));
});

gulp.task('css', function() {
	return gulp.src('src/scss/main.scss')
		.pipe(rename('style.scss'))
		.pipe(rename({suffix: '.min'}))
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(autoprefixer())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('src/css/'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function() {
	return gulp.src('src/**/*.html')
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function() {
	return gulp.src('src/js/**/*.js')
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
	browserSync.init({
			server: {
					baseDir: "src/"
			}
	});
});

gulp.task('watch', function() {
	gulp.watch('src/**/*.html', gulp.parallel('html'));
	gulp.watch('src/scss/**/*.scss', gulp.parallel('css'));
	gulp.watch('src/js/**/*.js', gulp.parallel('js'));
});

gulp.task('clean', function(done) {
	del.sync('dest');
	done();
});

gulp.task('export', function(done) {
	let buildHtml = gulp.src('src/**/*.html')
		.pipe(gulp.dest('dest/'));
	let buildCss = gulp.src('src/css/**/*.*')
		.pipe(gulp.dest('dest/css/'));
	let buildJs = gulp.src('src/js/**/*.*')
		.pipe(gulp.dest('dest/js/'));
	let buildFonts = gulp.src('src/fonts/**/*.*')
		.pipe(gulp.dest('dest/fonts/'));
	let buildImg = gulp.src('src/img/**/*.*')
		.pipe(gulp.dest('dest/img'));
	done();
});

gulp.task('default', gulp.series('scss', 'css', gulp.parallel('browser-sync', 'watch')));
gulp.task('build', gulp.series('clean', 'export'));