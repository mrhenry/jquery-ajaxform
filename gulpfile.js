'use strict';


/**
 * Dependencies
 */
var gulp    = require('gulp'),
    rename  = require('gulp-rename'),
    uglify  = require('gulp-uglify'),
    umd     = require('gulp-umd');



/**
 * @task
 *
 * Build
 */
gulp.task('build', function() {
  return gulp.src('src/*.js')
    .pipe(umd({
      exports: function() {
        return 'Ajaxform';
      },
      namespace: function() {
        return 'ajaxform';
      }
    }))
    .pipe(gulp.dest('build'))
    .pipe(rename({ extname: '.module.js' }))
    .pipe(gulp.dest('build'))
    .pipe(uglify({ preserveComments: 'some' }))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('build'))
});
