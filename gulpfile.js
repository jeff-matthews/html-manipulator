var gulp         = require('gulp');
var gutil        = require('gulp-util');
var exec         = require('child_process').exec;
var cheerio      = require('gulp-cheerio');
var jquery       = require('jquery');

/* Insert Google Analytics tracking code in index.html on production builds because Jekyll sucks sometimes * and I can't use the logic for conditional builds that I'm using in _includes/head.html
*/

//define wrapAll function because cheerio doesn't support the wrapAll jquery API call
function wrapAll(selector, wrapper) {
    (selector).first().before(wrapper).prev().append(selector);
}

gulp.task('convertLists', function () {
  return gulp
  .src(['src/*.html'])
  .pipe(cheerio({
    run: function ($, file) {
      // Each file will be run through cheerio and each corresponding `$` will be passed here.
      // `file` is the gulp file object

      //Wraps each SmartList1 + everything else until the next SmartList1 in an <ol>
      // $('p.SmartList1').each(function() {
      //   var $set = $(this).nextUntil("p.SmartList1").addBack();
      //   var $wrapper = $('<ol />');
      //   wrapAll($set, $wrapper);
      // });

      //Wrap each <p> in an <ol>
      // var SmartList1 = $('<ol />');
      // $('p').wrap(SmartList1);

      //Wraps each <p> with an <ol> except for <h1> and <h2>
      $('p').each(function() {
        var $set = $(this).nextUntil('.SmartList1').addBack().not('h1').not('h2');
        var $wrapper = $('<ol />');
        wrapAll($set, $wrapper);
      });

    }
  }))
  .pipe(gulp.dest('src/'));
});

//Scan all .html files in the src directory and convert lists from Madcap HTMl to real HTML.
gulp.task('default', ['convertLists']);
