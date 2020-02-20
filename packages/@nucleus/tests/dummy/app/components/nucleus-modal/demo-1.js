// BEGIN-SNIPPET modal-component.js
import Component from '@ember/component';
import { inject } from '@ember/service';
import RSVP from 'rsvp';
import { get } from '@ember/object'

export default Component.extend({
  flashMessages: inject(),
  isModal1: false,
  actions: {
    onSubmit(value) {
      get(this, 'flashMessages').success('Modal action complete.');
      return new RSVP.Promise((resolve) => {
        let wait = setTimeout(() => {
          clearTimeout(wait);
          resolve(value);
        }, 1000);
      });
    },
    onClose() {
      // this.set('isModal1', false);
      get(this, 'flashMessages').success('Modal closed.');
    }
  }
});
// END-SNIPPET