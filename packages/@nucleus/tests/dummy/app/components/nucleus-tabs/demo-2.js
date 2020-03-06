// BEGIN-SNIPPET nucleus-tabs-3.js
import Component from '@ember/component';
import { inject } from '@ember/service';
import RSVP from 'rsvp';
import { get } from '@ember/object';

export default Component.extend({
  flashMessages: inject(),
  actions: {
    beforeChange() { // changedTo, changedFrom, event params accepted
      const flashMessages = get(this, 'flashMessages');
      flashMessages.info(`Performing asyncronous operation..`, {
        timeout: 1500
      });
      return new RSVP.Promise(function(resolve) {
        setTimeout(function () {
          resolve();
        }, 2000);
      });
    },
    onChange() { // changedTo, ChangedFrom, event params accepted
      const flashMessages = get(this, 'flashMessages');
      flashMessages.info(`Tab changed.`, {
        timeout: 1500
      });
    }
  }
});
// END-SNIPPET
