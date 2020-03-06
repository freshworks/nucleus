// BEGIN-SNIPPET nucleus-tabs-2.js
import Component from '@ember/component';
import { inject } from '@ember/service';
import { get } from '@ember/object';

export default Component.extend({
  flashMessages: inject(),
  actions: {
    onChange(changedTo) { // changedTo, ChangedFrom, event params accepted
      const flashMessages = get(this, 'flashMessages');
      flashMessages.info(`Custom action invoked. '${changedTo}' tab selected!`, {
        timeout: 1500
      });
    }
  }
});
// END-SNIPPET
