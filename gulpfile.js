#!/usr/bin/node

var gulp = require('gulp');
var fs = require('fs');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');


var clientBundler = watchify(browserify('./src/app.js', watchify));
//var testsBundler = watchify(browserify('./tests/app.js', watchify));


gulp.task('build-client', function() {
  return clientBundler
    .transform(babelify)
    .bundle()
    .on('error', function(err) { console.log('Error: ' + err.message); })
    .pipe(source("app.js"))
    .pipe(gulp.dest('dist'))
});

gulp.task('watch', [ 'build-client' ], function() {
  clientBundler.on('update', function() {
    gulp.start('build-client');
  });
});
