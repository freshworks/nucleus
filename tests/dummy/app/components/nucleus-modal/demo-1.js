// BEGIN-SNIPPET modal-component.js
import Component from '@ember/component';
import RSVP from 'rsvp';

export default Component.extend({
  isModal1: false,
  actions: {
    onSubmit(value) {
      return new RSVP.Promise((resolve) => {
        let wait = setTimeout(() => {
          clearTimeout(wait);
          resolve(value);
        }, 1000)
      });
    },
    onClose() {
      alert('Modal closed');
    }
  }
});
// END-SNIPPET