'use strict';

const gulp = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const autoPrefixer = require('gulp-autoprefixer');
const cssMin = require('gulp-cssmin');
const rename = require('gulp-rename');
const size = require('gulp-size');

gulp.task('clean', function(cb){
    return gulp.src('./dist/*.css', { read: false })
        .pipe(rm());
})

const scssglobs = [
    './lib/**/*.scss',
    '!./lib/**/_*.scss'
]

gulp.task('sass', ['clean'], function(){
    return gulp.src(scssglobs)
        .pipe(autoPrefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(sass())
        .pipe(size({pretty: true, showFiles: true}))
        .pipe(size({pretty: true, showFiles: true, gzip: true}))
        .pipe(gulp.dest('./dist/'))
        .pipe(cssMin())
        .pipe(rename((path) => { path.basename += '.min'; }))
        .pipe(size({pretty: true, showFiles: true}))
        .pipe(size({pretty: true, showFiles: true, gzip: true}))
        .pipe(gulp.dest('./dist/'));
})

gulp.task('build', ['sass', 'clean'])

gulp.task('default', ['build'])