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
        title: 'Lorem ipsum dolor sit amet chris, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        type
      });
    },
    addItemWithLink(type) {
      const nucleusBanner = get(this, 'nucleusBanner');
      nucleusBanner.add({
        title: 'Lorem ipsum dolor sit amet chris, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        type,
        content: {
          linkText: "Click here",
          linkAction: this.testAction.bind(this) 
        }
      });
    }
  },
  testAction() {
    alert("Undo clicked!");
  }
});
// END-SNIPPET