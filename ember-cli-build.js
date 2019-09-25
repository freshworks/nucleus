'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
var nodeSass = require('node-sass');

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    sassOptions: {
      implementation: nodeSass
    },
    stylelint: {
      linterConfig:{
        syntax: 'scss'
      },
      includePaths: [
        'app/styles'
      ]
    }
  });

  return app.toTree();
};
