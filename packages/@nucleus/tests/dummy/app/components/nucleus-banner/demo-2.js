// BEGIN-SNIPPET nucleus-banner-2.js
import Component from '@ember/component';
import { inject } from '@ember/service';
import { get } from '@ember/object'

export default Component.extend({
  nucleusBanner: inject(),
  actions: {
    addItem(type) {
      const nucleusBanner = get(this, 'nucleusBanner');
      nucleusBanner.add({
        type,
        componentName: 'dummy-comp/demo-2-helper'
      });
    }
  }
});
// END-SNIPPET