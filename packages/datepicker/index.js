/* eslint-env node */
'use strict';
// eslint-disable-next-line node/no-unpublished-require
const mergeTrees = require('broccoli-merge-trees');
// eslint-disable-next-line node/no-unpublished-require
const Funnel = require('broccoli-funnel');
const path = require('path');

module.exports = {
  name: '@freshworks/datepicker',

  included(app, parentAddon) {
    let target = (parentAddon || app);
    target.options = target.options || {};
    target.options.babel = target.options.babel || { includePolyfill: true };
    return this._super.included.apply(this, arguments);
  },

  contentFor(type, config) {
    if ((type === 'body-footer' && config.environment !== 'test')) {
      return '<div id="nucleus-datepicker-wormhole"></div>';
    }
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
