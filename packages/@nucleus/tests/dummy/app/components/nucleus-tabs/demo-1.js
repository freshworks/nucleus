// BEGIN-SNIPPET tabs-component.js
import Component from '@ember/component';

export default Component.extend({
  actions: {
    onChange(name) {
      alert(`Custom action invoked. '${name}' tab selected!`)
    }
  }
});
// END-SNIPPET