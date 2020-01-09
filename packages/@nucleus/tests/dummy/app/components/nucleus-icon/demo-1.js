// BEGIN-SNIPPET nucleus-icon.js
import Component from '@ember/component';

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
  icons: null,

  init() {
    this._super(...arguments);
    this.set('icons', ICON_LIST)
  }
});
// END-SNIPPET
