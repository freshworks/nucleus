import Component from '@ember/component';
import { inject } from '@ember/service';
import { get } from '@ember/object'

export default Component.extend({
  flashMessages: inject(),
  actions: {
    foo() {
      const flashMessages = get(this, 'flashMessages');
      flashMessages.success('Successfully saved!');
    }
  }
});