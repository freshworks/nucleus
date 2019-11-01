// BEGIN-SNIPPET nucleus-banner.js
import Component from '@ember/component';
import { inject } from '@ember/service';
import { get } from '@ember/object'

export default Component.extend({
  nucleusBanner: inject(),
  actions: {
    addItem(type) {
      const nucleusBanner = get(this, 'nucleusBanner');
      nucleusBanner.add({
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        type
      });
    }
  },
  testAction() {
    alert("Undo clicked!");
  }
});
// END-SNIPPET