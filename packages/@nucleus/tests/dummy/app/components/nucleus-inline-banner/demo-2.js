// BEGIN-SNIPPET inline-banner-component-2.js
import Component from '@ember/component';

export default Component.extend({
  actions: {
    onClose(value) {
      alert(value);
    }
  }
});
// END-SNIPPET