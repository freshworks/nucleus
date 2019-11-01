'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const { UnwatchedDir } = require('broccoli-source');
const MergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');
const { readdirSync } = require('fs');

const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dir => dir.isDirectory())
    .map(dir => dir.name)

// all packages except @nucleus
const NUCLEUS_PACKAGES = getDirectories('../../packages').slice(1);

const treesForPackages = () => {
  let addonPackages = [];

  NUCLEUS_PACKAGES.forEach((packageName) => {
    addonPackages.push(new Funnel(`../${packageName}/addon`, {
      destDir: `@freshworks/${packageName}`
    }));
  });

  return addonPackages;
}

module.exports = function(defaults) {
  // Build addon docs tree
  let baseFiles = new Funnel(new UnwatchedDir('./'), {
    include: ['package.json', 'README.md']
  });

  let tree = new MergeTrees(
    [
      baseFiles,
      ...treesForPackages()
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
