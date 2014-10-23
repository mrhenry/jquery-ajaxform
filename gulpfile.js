'use strict';


/**
 * Dependencies
 */
var bump        = require('gulp-bump'),
    filter      = require('gulp-filter'),
    git         = require('gulp-git'),
    gulp        = require('gulp'),
    rename      = require('gulp-rename'),
    tagVersion  = require('gulp-tag-version'),
    uglify      = require('gulp-uglify'),
    umd         = require('gulp-umd');



/**
 * @task
 *
 * Build
 */
gulp.task('default', function() {
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



function inc(importance) {
    // get all the files to bump version in
    return gulp.src(['./package.json', './bower.json'])
        // bump the version number in those files
        .pipe(bump({type: importance}))
        // save it back to filesystem
        .pipe(gulp.dest('./'))
        // commit the changed version number
        .pipe(git.commit('bumps package version'))

        // read only one file to get the version number
        .pipe(filter('package.json'))
        // **tag it in the repository**
        .pipe(tagVersion())
        .pipe(git.push('origin', 'master', { args: '--tags' }));
}

gulp.task('patch', function() { return inc('patch'); })
gulp.task('feature', function() { return inc('minor'); })
gulp.task('release', function() { return inc('major'); })
