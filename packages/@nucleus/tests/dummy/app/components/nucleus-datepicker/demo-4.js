// BEGIN-SNIPPET nucleus-datepicker-4.js
import Component from '@ember/component';
import { inject } from '@ember/service';
import { get } from '@ember/object';

export default Component.extend({
  flashMessages: inject(),
  actions: {
    onUpdate(date) { 
      let message = (date.start && date.end)? `'${date.start} to ${date.end}' picked.` : `Select start and end dates from calendar.`;
      const flashMessages = get(this, 'flashMessages');
      flashMessages.info(message, {
        timeout: 1500
      });
    }
  }
});
// END-SNIPPET
