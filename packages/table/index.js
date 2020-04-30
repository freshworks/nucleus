/* eslint-env node */
'use strict';
// eslint-disable-next-line node/no-unpublished-require
const mergeTrees = require('broccoli-merge-trees');
// eslint-disable-next-line node/no-unpublished-require
const Funnel = require('broccoli-funnel');
const path = require('path');

module.exports = {
  name: '@freshworks/table',

  isDevelopingAddon() {
    return true;
  },

  included(app, parentAddon) {
    let target = (parentAddon || app);
    target.options = target.options || {};
    target.options.babel = target.options.babel || { includePolyfill: true };
    return this._super.included.apply(this, arguments);
  },

  treeForAddonStyles(tree) {
    let coreStyleTree = new Funnel(this.getCoreStylesPath(), {
      destDir: 'nucleus'
    });
    return mergeTrees([coreStyleTree, tree]);
  },

  getCoreStylesPath() {
    let pkgPath = path.dirname(require.resolve(`@freshworks/core/package.json`));
    return path.join(pkgPath, 'app/styles');
  }
};
