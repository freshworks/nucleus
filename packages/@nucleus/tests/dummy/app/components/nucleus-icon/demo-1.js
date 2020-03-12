// BEGIN-SNIPPET nucleus-icon.js
import Component from '@ember/component';
import { inject } from '@ember/service';
import copyToClipboard from '../../utils/copy-to-clipboard';
import icons from '../../constants/icons';

export default Component.extend({
  flashMessages: inject(),

  icons: null,

  init() {
    this._super(...arguments);
    this.set('icons', icons)
  },

  actions: {
    copyIcon(icon) {
      copyToClipboard(icon)
        .then(this.flashMessages.success(`Copied '${icon}' to clipboard`));
    }
  }
});
// END-SNIPPET
