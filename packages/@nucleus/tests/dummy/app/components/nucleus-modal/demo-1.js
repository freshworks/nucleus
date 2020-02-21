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
      return new RSVP.Promise((resolve) => {
        let wait = setTimeout(() => {
          clearTimeout(wait);
          get(this, 'flashMessages').success('Modal action complete.');
          resolve(value);
        }, 1000);
      });
    }
  }
});
// END-SNIPPET