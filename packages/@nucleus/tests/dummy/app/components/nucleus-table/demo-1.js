// BEGIN-SNIPPET table-component.js
import Component from '@ember/component';
import { A } from '@ember/array';

export default Component.extend({
  columns: A([
      { name: 'Source', valuePath: 'source', selected: true, disabled: true},
      { name: 'Contact', valuePath: 'contact', selected: true, disabled: true},
      { name: 'Status', valuePath: 'status', selected: true, disabled: false},
      { name: 'PhNo', valuePath: 'phno', selected: false, disabled: false},
      { name: 'Subject', valuePath: 'subject', selected: false, disabled: false},
    ]),
  rows: A([
      { source: 'Twitter', contact: 'Albus', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
      { source: 'WhatsApp', contact: 'Percival', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
      { source: 'FB', contact: 'Wulfric', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
      { source: 'Call', contact: 'Brian', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
      { source: 'Email', contact: 'Dumbledore', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
      { source: 'FB', contact: 'Gandalf', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
      { source: 'Twitter', contact: 'Severus', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
      { source: 'Call', contact: 'Alan', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
      { source: 'ABC', contact: 'Snape', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
    ])
});
// END-SNIPPET