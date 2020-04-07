// BEGIN-SNIPPET nucleus-datepicker-1.js
import Component from '@ember/component';
import { inject } from '@ember/service';
import { get } from '@ember/object';

export default Component.extend({
  flashMessages: inject(),
  actions: {
    onUpdate(date) { 
      let message = (date)? `'${date}' picked.` : `Select some date from calendar.`;
      const flashMessages = get(this, 'flashMessages');
      flashMessages.info(message, {
        timeout: 1500
      });
    }
  }
});
// END-SNIPPET
