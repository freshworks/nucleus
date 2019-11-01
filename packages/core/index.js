/* eslint-env node */
'use strict';

module.exports = {
  name: '@freshworks/core',

  isDevelopingAddon() {
    return true;
  },

  included(app, parentAddon) {
    // Mandatory for ember-cli-sass
    // https://www.npmjs.com/package/ember-cli-sass#addon-usage
    let target = (parentAddon || app);
    target.options = target.options || {};
    target.options.babel = target.options.babel || { includePolyfill: true };
    return this._super.included.apply(this, arguments); 
  }
};
