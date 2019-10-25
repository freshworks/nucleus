// BEGIN-SNIPPET button-loading.js
import Component from '@ember/component';
import RSVP from 'rsvp';

export default Component.extend({
  actions: {
    download(value) {
      return new RSVP.Promise((resolve) => {
        let wait = setTimeout(() => {
          clearTimeout(wait);
          resolve(value);
        }, 1000)
      });
    }
  }
});
// END-SNIPPET