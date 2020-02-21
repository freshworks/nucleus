// [TODO] Move to core if required

import { set } from '@ember/object';

/**
  Use this util to safely set a property in callbacks or later runs.

  ```js
  import Component from '@ember/component';
  import safeSet from "../utils/safe-set";
  import { later } from "f@ember/runloop";
  export default Component.extend({
    state: null,
    action: {
      setFocusState() {
        later(() => {
          safeSet(this, 'state', 'focussed');
        }, 1000);
      }
    }
  });
  ```
  @function safeSet
  @param {object} context reference of the instance
  @param {string} key name of the property that needs to be modified
  @param {string} value value to be updated
*/


export default function safeSet(context, key, value) {
  if (!context.isDestroyed && !context.isDestroying) {
    set(context, key, value);
  }
}
