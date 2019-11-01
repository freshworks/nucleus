'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const { UnwatchedDir } = require('broccoli-source');
const MergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');

function treeForPackage(packageName) {
  let addonFiles = new Funnel(`../${packageName}/addon`, {
    destDir: `@freshworks/${packageName}`
  });

  return addonFiles;
}

module.exports = function(defaults) {
  // Build addon docs tree
  let baseFiles = new Funnel(new UnwatchedDir('./'), {
    include: ['package.json', 'README.md']
  });

  let tree = new MergeTrees(
    [
      baseFiles,
      treeForPackage('button'),
      treeForPackage('core'),
      treeForPackage('modal')
    ]
  );

  let app = new EmberAddon(defaults, {
    stylelint: {
      linterConfig:{
        syntax: 'scss'
      },
      includePaths: [
        'app/styles'
      ]
    },
    'ember-cli-addon-docs': {
      projects: {
        main: tree
      }
    }
  });

  return app.toTree();
};
