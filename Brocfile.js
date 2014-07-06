/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');

var app = new EmberApp();

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

app.import('vendor/d3/d3.js');

// https://github.com/stefanpenner/ember-cli/issues/445
var bootstrapTree = pickFiles('vendor', {
  srcDir: '/bootstrap/dist/css/',
  // files: [ ''],
  destDir: '/assets'
});

// module.exports = app.toTree();
module.exports = mergeTrees([app.toTree(), bootstrapTree]);
