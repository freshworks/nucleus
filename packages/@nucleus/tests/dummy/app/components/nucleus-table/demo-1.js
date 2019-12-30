// BEGIN-SNIPPET table-component.js
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  columns: computed(function() {
    return [
      { name: 'Source', valuePath: 'A'},
      { name: 'Contact', valuePath: 'B'},
      { name: 'Subject', valuePath: 'C', width: 400},
      { name: 'Status', valuePath: 'D'},
    ];
  }),
  
  rows: computed(function() {
    return [
      { A: 'FB', B: 'Shibu', C: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', D: 'D' },
      { A: 'FB', B: 'Lijack', C: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', D: 'D' },
      { A: 'FB', B: 'Naveen', C: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', D: 'D' },
      { A: 'FB', B: 'Anto', C: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', D: 'D' },
      { A: 'FB', B: 'Chrislin', C: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', D: 'D' },
      { A: 'FB', B: 'Deborah', C: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', D: 'D' },
      { A: 'FB', B: 'Maria', C: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', D: 'D' },
      { A: 'FB', B: 'Omana', C: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', D: 'D' },
      { A: 'FB', B: 'Alan', C: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', D: 'D' },
    ];
  }),
  actions: {
  }
});
// END-SNIPPET