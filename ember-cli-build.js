'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const nodeSass = require('node-sass');

module.exports = function (defaults) {
  var app = new EmberAddon(defaults, {
    // Add options here

    hinting: false,

    snippetPaths: ['tests/dummy/app/snippets'],
    snippetSearchPaths: ['tests/dummy/app'],

    autoprefixer: {
      browsers: ['last 2 versions', 'last 4 Android versions'],
      sourceMap: true,
      enabled: true
    },

    sassOptions: {
      implementation: nodeSass,
      sourceMapEmbed: true,
      outputFile: 'dummy.css'
    },

    outputPaths: {
      app: {
        css: {
          'app': '/assets/dummy.css',
          //'ember-material-design': '/assets/dummy.css'
        }
      }
    }


  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */


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

  if (app.env === 'test' || app.env === 'development') {
    app.import(app.bowerDirectory + '/ember/ember-template-compiler.js', {type: 'test'});
  }

  return app.toTree();
};
