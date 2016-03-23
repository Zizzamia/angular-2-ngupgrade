var gulp = require('gulp');
var path = require('path');

var gutil = require('gutil');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');

var webpack = require('webpack');

var fs = require('fs');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var argv = require('optimist').argv;

var buildConfig = {};
/** Type of build: production or development. */
buildConfig.type = argv['build-type'] || 'development';
/** The environent that the build uses. */
buildConfig.environment = argv['build-environment'] || 'development';
buildConfig.testing = false;

/**
 * Vars
 * Sets build specific variables. */
gulp.task('vars:build', function() {
  /** The build directory. */
  buildConfig.dir = 'assets/dist';
});

/**
 * Clean
 * Cleans the build directory before a build. */
gulp.task('clean', function() {
  return gulp.src(buildConfig.dir + '/').pipe(clean());
});
gulp.task('clean:main', function() {
  return gulp.src(buildConfig.dir + '/main.js').pipe(clean());
});

/**
 * Webpack
 * Builds an app bundle once. Used for the build task. */
gulp.task('webpack-build', ['pre-build'], function(callback) {
  var compiler = webpack(webpackConfig());
  compiler.run(function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack-build', err);
    }
    gutil.log("[webpack:build]", stats.toString({
      colors: true
    }));
    callback();
  });
});

/**
 * Build
 * Performs all the build tasks except webpack.
 */
gulp.task('pre-build', function(done) {
  runSequence(
    'vars:build',
    'clean:main',
    done
  );
});

/**
 * Build
 * Builds the project. */
gulp.task('build', ['webpack-build'], function () {
  var env = buildConfig.type == 'development' ? 'Development' : 'Production';
  var output = env + ' build done for environment ' + buildConfig.environment + 
               ' in ./' + buildConfig.dir + '.';
  gutil.log(output);
});

/**
 * Webpack
 * Processes the Webpack configuration file.
 */
function webpackConfig() {
  var options = {};

  options.dir = path.resolve(__dirname, buildConfig.dir);

  options.defines = {
    __TESTING__: buildConfig.testing,
    __DEV__: buildConfig.environment === 'development' ? true : false,
    __STAGE__: buildConfig.environment === 'stage' ? true : false,
    __PRODUCTION__: buildConfig.environment === 'production' ? true : false
  };

  if (buildConfig.type === 'development') {
    options.sourcemaps = true;
    options.devtool = 'eval';
    options.debug = true;
    options.minimize = false;
    options.chunk = !buildConfig.testing;
  } else if (buildConfig.type === 'stage') {
    options.sourcemaps = true;
    options.devtool = 'eval';
    options.debug = true;
    options.minimize = false;
    options.chunk = !buildConfig.testing;
  } else {
    options.sourcemaps = false;
    options.devtool = '';
    options.debug = false;
    options.minimize = true;
    options.chunk = !buildConfig.testing;
  }

  return require('./assets/config/webpack-make-config')(options);
}
