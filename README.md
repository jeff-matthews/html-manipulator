# What is this thing?
A simple project that uses [Gulp](http://gulpjs.com/) tasks to:

- Scan all .html files in a source directory (`src/`)
- Manipulate HTML elements using the [`cheerio`](https://github.com/cheeriojs/cheerio) implementation of _core_ jQuery functions
- Pipe manipulated output to a new directory (`dist/`) to preserve your source files

**_Note:_** _You can use plain 'ole JavaScript instead of jQuery if you want._

For example, suppose you wanted to wrap all `<p>` elements in a file with an `<li>` tag. Just add the following gulp task to `gulpfile.js` and run `gulp <taskNameHere>` from a terminal (or command prompt on Windows):

```javascript
gulp.task('taskNameHere', function () {
  return gulp
  //Scan all .html files in a directory and/or subdirectory
  .src(['src/**/*.html'])
  //Use cheerio
  .pipe(cheerio({
    run: function ($, file) {
      // Each file will be run through cheerio and each corresponding `$` will be passed here.
      // `file` is the gulp file object
      //Wrap each <p> element in an <li> tag
      var list = $('<li />');
      $('p').wrap(list);
    }
  }))
  //Send manipulated HTML files to a separate directory so you don't overwrite your source files.
  .pipe(gulp.dest('dist/'));
});
```

You can chain multiple Gulp tasks together and run them in parallel to each other or in a specific sequence. By default, Gulp runs tasks in parallel. For more information about running tasks sequentially, refer to the [run-sequence](https://www.npmjs.com/package/run-sequence) npm package.

## Install

1. Install [Node.js](https://nodejs.org/en/) on your machine.
2. Clone or download this repo.
3. Open a terminal (or command prompt on Windows) and navigate to this directory.
4. Run `npm install` to install project dependencies.

## Run

1. Open a terminal (or command prompt on Windows) and navigate to this directory.
2. Add .html files to the `src/` directory.
3. Run `gulp`.
4. Inspect the files in the `dist/` directory to see how the jQuery Gulp task changed the HTML.
5. Revise the jQuery code in [`gulpfile.js`](../gulpfile.js) to manipulate the HTML according to your needs. Refer to [cheerio's docs]() for usage information and examples.
6. Repeat steps 2-5 as needed until you're satisfied with the HTML output.

**_Note:_** _The cheerio package doesn't support all jQuery functions. If you see a "`is not a function`" error in your console after running gulp, chances are you're trying to use an unsupported function. You can either write your own, like I did for wrapAll() in `gulpfile.js` or rethink your approach (i.e., use vanilla JS)._
