'use strict';

// eslint-disable-next-line node/no-unpublished-require
const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  let app = new EmberAddon(defaults,
    {
      hinting: false,
      svgJar: {
        sourceDirs: [
          'public/assets/icons'
        ]
      }
    }
  );

  return app.toTree();
};
