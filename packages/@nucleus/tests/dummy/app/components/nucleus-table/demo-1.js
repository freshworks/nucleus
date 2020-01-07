// BEGIN-SNIPPET table-component.js
import Component from '@ember/component';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Component.extend({
  totalRecords: 9,
  recordsPerPage: 9,
  columns: computed(function() {
    return A([
      { name: 'Source', valuePath: 'A', selected: true, disabled: false},
      { name: 'Contact', valuePath: 'B', selected: false, disabled: false},
      { name: 'Subject', valuePath: 'C', width: 400, selected: false, disabled: false},
      { name: 'Status', valuePath: 'D', selected: false, disabled: false},
    ]);
  }),
  totalRows: computed(function() {
    return A([
      { A: 'FB', B: 'Shibu', C: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', D: 'D' },
      { A: 'FB', B: 'Lijack', C: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', D: 'D' },
      { A: 'FB', B: 'Naveen', C: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', D: 'D' },
      { A: 'FB', B: 'Anto', C: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', D: 'D' },
      { A: 'FB', B: 'Chrislin', C: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', D: 'D' },
      { A: 'FB', B: 'Deborah', C: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', D: 'D' },
      { A: 'FB', B: 'Maria', C: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', D: 'D' },
      { A: 'FB', B: 'Omana', C: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', D: 'D' },
      { A: 'FB', B: 'Alan', C: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', D: 'D' },
    ]);
  }),
  selectedRows: computed(function() {
    return this.get('totalRows').slice(0, this.get('recordsPerPage'));
  }),
  actions: {
    getPageContent(pageNumber) {
      let index = (pageNumber - 1) * this.get('recordsPerPage');
      let resultArr = this.get('totalRows').slice(index, index + this.get('recordsPerPage'));
      this.set('selectedRows', resultArr);
    }
  }
});
// END-SNIPPET