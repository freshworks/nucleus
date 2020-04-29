// BEGIN-SNIPPET table-component4.js
import Component from '@ember/component';
import { A } from '@ember/array';

export default Component.extend({
  columns: A([
      { name: 'Source', valuePath: 'source', selected: true, disabled: true},
      { name: 'Contact', valuePath: 'contact', selected: true, disabled: true},
      { name: 'Status', valuePath: 'status', selected: true, disabled: false},
      { name: 'Subject', valuePath: 'subject', selected: false, disabled: false},
      { name: 'Phno', valuePath: 'phno', selected: false, disabled: false},
    ]),
  rows: A([
      { source: 'ABC', contact: 'Rick', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
      { source: 'Twitter', contact: 'Sanchez', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
      { source: 'Email', contact: 'Jim', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
      { source: 'FB', contact: 'Hopper', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
      { source: 'Call', contact: 'Nancy', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
      { source: 'WhatsApp', contact: 'Wheeler', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
      { source: 'ABC', contact: 'Joyce', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
      { source: 'Email', contact: 'Byers', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
      { source: 'FB', contact: 'El - Eleven', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
    ]),

  selectedValues: A([]),

  onSelectRows(value) {
    console.log("executed");
    if (value && value.length > 0) {
      this.selectedValues = value;
    }
  }
  
});
// END-SNIPPET