'use strict';

var gulp								= require('gulp'),
		nib									= require('nib'),
		rename							= require('gulp-rename'),
		stylus							= require('gulp-stylus'),
		concat 							= require('gulp-concat'),
		sourcemaps 					= require('gulp-sourcemaps'),
		uglify							= require('gulp-uglify'),
		staticPath 					= 'src/',
		publicStaticPath		= 'src/public/',
		ngAnnotate 					= require('gulp-ng-annotate'),
		browserSync         = require('browser-sync'),
		jshint              = require("gulp-jshint"),
		index               = staticPath;

// Proceso para minificar app Angular
		gulp.task('js', function () {
		  gulp.src([staticPath + '/js/app/**/*.js'])
		    .pipe(sourcemaps.init())
				.pipe(jshint())
		    .pipe(concat('main.js'))
		    .pipe(ngAnnotate())
		    .pipe(sourcemaps.write())
				.pipe(rename('app.min.js'))
		    .pipe(gulp.dest(publicStaticPath + 'js/'))
				.pipe(browserSync.reload({stream: true}));
		});


// Proceso para minificar librerias y vendorjs
		gulp.task('vendorjs', function () {
		  gulp.src([ staticPath + 'js/vendor/*.min.js'])
		  	.pipe(concat('vendor.js'))
				.pipe(rename('vendor.min.js'))
		    .pipe(gulp.dest(publicStaticPath + 'js/'))
				.pipe(browserSync.reload({stream: true}));
		});

// Proceso para minificar librerias y vendorcss
	gulp.task('vendorcss', function () {
	  gulp.src([ staticPath + '/css/**/*.css'])
	  	.pipe(concat('vendor.css'))
	    .pipe(gulp.dest(publicStaticPath + 'css/'))
			.pipe(browserSync.reload({stream: true}));
	});


// Proceso de compilacion de archivos stylus
gulp.task('stylus', function() {
	gulp.src( staticPath + 'stylus/main.styl' )
		.pipe(stylus({
			use: nib(),
			compress: false
		}))
		.pipe(rename('main.min.css'))
		.pipe(gulp.dest( publicStaticPath + 'css/'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('stylus-lanstatic', function() {
	gulp.src( staticPath + 'stylus/lanpage.styl' )
		.pipe(stylus({
			use: nib(),
			compress: false
		}))
		.pipe(rename('lanpage.min.css'))
		.pipe(gulp.dest( publicStaticPath + 'css/'))
		.pipe(browserSync.reload({stream: true}));
});

// Proceso de compilacion de archivos stylus
gulp.task('html', function() {
	gulp.src( staticPath + '/html/*.html' )
	.pipe(gulp.dest( publicStaticPath ))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('static', function() {
	gulp.src( staticPath + '/img/*' )
	.pipe(gulp.dest( publicStaticPath + 'img/'))
	.pipe(browserSync.reload({stream: true}));
});

/*
* Browser Sync task
*/
gulp.task('browser-sync', ['stylus','stylus-lanstatic', 'js', 'vendorjs','vendorcss','html','static'], function () {
  browserSync({
    server: {
      baseDir: './src/public/'
    }
  });
});


// Escuchando Cambios
gulp.task('watch', function() {
	gulp.watch([staticPath + '/stylus/**/*.styl'], ['stylus']);
	gulp.watch([staticPath + '/stylus/lanpage.styl'], ['stylus-lanstatic']);
	gulp.watch([staticPath + '/css/**/*.css'], ['vendorcss']);
  gulp.watch([staticPath + '/js/ventor/**/*.js'], ['vendorjs']);
	gulp.watch([staticPath + '/js/app/**/*.js'], ['js']);
	gulp.watch([staticPath + '/html/*.html'], ['html']);
	gulp.watch([staticPath + '/imagen/*'], ['static']);
});

gulp.task('default', [ 'browser-sync','watch' ]);
