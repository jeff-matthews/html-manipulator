var gulp         = require('gulp');
var gutil        = require('gulp-util');
var exec         = require('child_process').exec;
var cheerio      = require('gulp-cheerio');
var jquery       = require('jquery');

/* Insert Google Analytics tracking code in index.html on production builds because Jekyll sucks sometimes * and I can't use the logic for conditional builds that I'm using in _includes/head.html
*/
gulp.task('convertLists', function () {
  return gulp
  .src(['src/*.html'])
  .pipe(cheerio({
    run: function ($, file) {
      $('p.SmartList1').each(function() {
        $(this).nextUntil("SmartList1");
      });
    }
  }))
  .pipe(gulp.dest('src/'));
});

//Scan all .html files in the src directory and convert lists from Madcap HTMl to real HTML.
gulp.task('default', ['convertLists']);
