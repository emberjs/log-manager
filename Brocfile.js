module.exports = function (broccoli) {
  var compileES6 = require('broccoli-es6-concatenator');
  var pickFiles = require('broccoli-static-compiler');
  var uglifyJavaScript = require('broccoli-uglify-js');
  var env = require('broccoli-env').getEnv();
  var MergedTree = broccoli.MergedTree;

  // Get package info
  var fs = require('fs');
  var packageFile = __dirname + '/package.json';
  var pkg = JSON.parse(fs.readFileSync(packageFile, 'utf8'));
  var name = pkg.name;

  // array to be returned at the end
  var final = [];


  // Pick out the loader.js file for later use
  var vendor = 'vendor';

  var loader = pickFiles(vendor, {
    srcDir: '/',
    files: ['loader.js'],
    destDir: '/vendor'
  });

  // ES6 module transpilation options
  var compileES6Options = {
    loaderFile: 'vendor/loader.js',
    inputFiles: ['**/*.js'],
    wrapInEval: false,
    ignoredModules: ['vendor/loader']
  };


  var lib = 'lib';

  // If testing, build test files with index.html
  if (env === 'development') {

    var tests = 'test';

    var testFiles = pickFiles(tests, {
      srcDir: '/tests',
      destDir: '/tests'
    });
    compileES6Options.outputFile = '/tests.js';
    var testsAndLibAndLoader = new MergedTree([testFiles, loader, lib]);
    testFiles = compileES6(testsAndLibAndLoader, compileES6Options);
    var vendorFiles = pickFiles(tests, {
      srcDir: '/vendor',
      destDir: '/vendor'
    });
    var indexFile = pickFiles(tests, {
      srcDir: '/',
      files: ['index.html'],
      destDir: '/'
    });
    testFiles = new MergedTree([testFiles, vendorFiles, indexFile]);

    final.push(testFiles);

  } else {
    // If building for production build release files and minify
    var libAndLoader = new MergedTree([lib, loader]);

    compileES6Options.outputFile = '/' + name + '.js';
    var dist = compileES6(libAndLoader, compileES6Options);
    final.push(dist);

    compileES6Options.outputFile = '/' + name + '.min.js';
    var distProd = compileES6(libAndLoader, compileES6Options);
    distProd = uglifyJavaScript(distProd);
    final.push(distProd);
  }


  return final;
};
