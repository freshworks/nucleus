// BEGIN-SNIPPET table-component.js
import Component from '@ember/component';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Component.extend({
  totalRecords: 9,
  recordsPerPage: 5,
  columns: computed(function() {
    return A([
      { name: 'Source', valuePath: 'source', selected: true, disabled: false},
      { name: 'Contact', valuePath: 'contact', selected: true, disabled: true},
      { name: 'Status', valuePath: 'status', selected: true, disabled: false},
    ]);
  }),
  totalRows: computed('columns', function() {
    return A([
      { source: 'FB', contact: 'Shibu', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
      { source: 'FB', contact: 'Lijack', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
      { source: 'FB', contact: 'Naveen', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
      { source: 'FB', contact: 'Anto', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
      { source: 'FB', contact: 'Chrislin', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
      { source: 'FB', contact: 'Deborah', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
      { source: 'FB', contact: 'Maria', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
      { source: 'FB', contact: 'Omana', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
      { source: 'FB', contact: 'Alan', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
    ]);
  }),
  selectedRows: computed('totalRows', function() {
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