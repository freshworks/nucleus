// BEGIN-SNIPPET nucleus-banner-2-helper.js
import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  nucleusBanner: inject(),
  actions: {
    onCustomClick() {
      alert("custom component action invoked!")
    }
  }
});
// END-SNIPPET