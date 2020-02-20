// BEGIN-SNIPPET dialog-component.js
import Component from '@ember/component';
import { inject } from '@ember/service';
import { get } from '@ember/object'

export default Component.extend({
  flashMessages: inject(),
  actions: {
    onSubmit(value) {
      get(this, 'flashMessages').success(value);
    }
  }
});
// END-SNIPPET