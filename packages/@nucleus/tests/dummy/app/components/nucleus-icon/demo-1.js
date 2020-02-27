// BEGIN-SNIPPET nucleus-icon.js
import Component from '@ember/component';
import { inject } from '@ember/service';
import copyToClipboard from '../../utils/copy-to-clipboard';

const ICON_LIST = [
  "nucleus-circle-check",
  "nucleus-circle-cross",
  "nucleus-circle-help",
  "nucleus-circle-info",
  "nucleus-circle-minus",
  "nucleus-circle-plus",
  "nucleus-cross-thin",
  "nucleus-cross"
];

export default Component.extend({
  flashMessages: inject(),

  icons: null,

  init() {
    this._super(...arguments);
    this.set('icons', ICON_LIST)
  },

  actions: {
    copyIcon(icon) {
      copyToClipboard(icon)
        .then(this.flashMessages.success(`Copied '${icon}' to clipboard`));
    }
  }
});
// END-SNIPPET
