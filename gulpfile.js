"use strict";

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var less = require('gulp-less');

gulp.task('default', function () {
    browserify('./src/main.jsx')
        .transform('babelify', { presets: ['es2015', 'react'] })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist'));

    gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist'));

    gulp.src('./src/reactRadial.less')
        .pipe(less())
        .pipe(gulp.dest('./dist'));
});