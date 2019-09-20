import Component from '@ember/component';

export default Component.extend({

  actions: {
    // BEGIN-SNIPPET modal-demo-simple.js
    toggleIsShowing() {
      this.toggleProperty('isShowing');
    }
    // END-SNIPPET
  }

});