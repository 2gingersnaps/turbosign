/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are split into several files in the gulp directory
 *  because putting it all here was too long
 */

'use strict';

var gulp = require('gulp');
var wrench = require('wrench');

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});


/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});


// ///////////////////////////////////////////////////////////////////


var awspublish = require('gulp-awspublish');
 
gulp.task('publish', function() {
 
  // create a new publisher using S3 options 
  // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property 
  var publisher = awspublish.create({
    region: 'us-east-1',
    params: {
      Bucket: 'turbosign'
    }
  }, {
    cacheFile: '.aws-cache.json'
  });
 
  // define custom headers 
  var headers = {
    'Cache-Control': 'max-age=100, no-transform, public'
    // ... 
  };
 

  // return gulp.src('./public/*.js') /////////// original
  return gulp.src('dist/**/*')
     // gzip, Set Content-Encoding headers and add .gz extension
     .pipe(awspublish.gzip())
    // .pipe(awspublish.gzip({ ext: '.gz' }))
 
    // publisher will add Content-Length, Content-Type and headers specified above 
    // If not specified it will set x-amz-acl to public-read by default 
    .pipe(publisher.publish(headers))
 
    // create a cache file to speed up consecutive uploads 
    .pipe(publisher.cache())
 
     // print upload updates to console 
    .pipe(awspublish.reporter());
});
 
// output 
// [gulp] [create] file1.js.gz 
// [gulp] [create] file2.js.gz 
// [gulp] [update] file3.js.gz 
// [gulp] [cache]  file3.js.gz 
// ... 
