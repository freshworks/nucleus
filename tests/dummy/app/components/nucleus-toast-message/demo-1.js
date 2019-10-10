// BEGIN-SNIPPET toast-message-component.js
import Component from '@ember/component';
import { inject } from '@ember/service';
import { get } from '@ember/object'

export default Component.extend({
  flashMessages: inject(),
  actions: {
    success() {
      const flashMessages = get(this, 'flashMessages');
      flashMessages.success('Successfully saved!', {
        timeout: 2000,
        sticky: true,
        priority: 100,
        content: {
          linkText: "Undo action",
          linkAction: this.testAction.bind(this) 
        }
      });
    },
    danger() {
      const flashMessages = get(this, 'flashMessages');
      flashMessages.danger('Successfully deleted!', {
        timeout: 2000,
        sticky: true,
        priority: 100,
        showProgress: false
      });
    },
    info() {
      const flashMessages = get(this, 'flashMessages');
      flashMessages.info('Some information', {
        timeout: 2000,
        sticky: false,
        priority: 100,
        showProgress: true
      });
    },
    warning() {
      const flashMessages = get(this, 'flashMessages');
      flashMessages.warning('Some information', {
        timeout: 2000,
        sticky: false,
        priority: 100,
        showProgress: true
      });
    }
  },
  testAction() {
    alert("Undo clicked!");
  }
});
// END-SNIPPET
