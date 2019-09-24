// BEGIN-SNIPPET button-loading.js
import Controller from '@ember/controller';
import RSVP from '@ember/RSVP';
export default Controller.extend({
  actions: {
    download(value) {
      return new RSVP.Promise(function(resolve, reject) {
        resolve(value);
        reject();
      });
    }
  }
});
// END-SNIPPET