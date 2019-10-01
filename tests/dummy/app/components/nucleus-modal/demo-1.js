// BEGIN-SNIPPET modal-component.js
import Component from '@ember/component';

export default Component.extend({
  actions: {
    onSubmit(value) {
      alert(value);
    },
    onClose() {
      alert('Modal closed');
    }
  }
});
// END-SNIPPET