// BEGIN-SNIPPET dialog-component.js
import Component from '@ember/component';

export default Component.extend({
  actions: {
    onSubmit(value) {
      alert(value);
    }
  }
});
// END-SNIPPET