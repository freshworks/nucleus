// BEGIN-SNIPPET table-component.js
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  totalRecords: 9,
  recordsPerPage: 3,
  columns: computed(function() {
    return [
      { name: 'Source', valuePath: 'A'},
      { name: 'Contact', valuePath: 'B'},
      { name: 'Subject', valuePath: 'C', width: 400},
      { name: 'Status', valuePath: 'D'},
    ];
  }),
  
  totalRows: computed(function() {
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