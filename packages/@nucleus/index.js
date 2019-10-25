/* eslint-env node */
'use strict';

module.exports = {
  name: 'nucleus',

  isDevelopingAddon() {
    return true;
  },

  included(app, parentAddon) {
    let target = (parentAddon || app);
    target.options = target.options || {};
    target.options.babel = target.options.babel || { includePolyfill: true };
    return this._super.included.apply(this, arguments);
  },

  contentFor(type, config) {
    if ((type === 'body-footer' && config.environment !== 'test') || (type === 'test-body-footer' && config.environment === 'test')) {
      return '<div id="nucleus-modal-wormhole"></div>';
    }
  }
};
