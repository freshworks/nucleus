/* eslint-env node */
'use strict';

module.exports = {
  name: '@freshworks/core',

  isDevelopingAddon() {
    return true;
  },

  included() {
    // Mandatory for ember-cli-sass
    // https://www.npmjs.com/package/ember-cli-sass#addon-usage
    return this._super.included.apply(this, arguments); 
  }
};
