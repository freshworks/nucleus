// BEGIN-SNIPPET table-component6.js
import Component from '@ember/component';
import { A } from '@ember/array';

export default Component.extend({
  columns: A([
      { name: 'Source', valuePath: 'source', selected: true, disabled: true},
      { name: 'Contact', valuePath: 'contact', selected: true, disabled: true},
      { name: 'Status', valuePath: 'status', selected: false, disabled: false},
      { name: 'Subject', valuePath: 'subject', selected: false, disabled: false},
      { name: 'PhNo', valuePath: 'phno', selected: true, disabled: false},
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
      { source: 'ABC', contact: 'Morty', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
      { source: 'Twitter', contact: 'Sanchez', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
      { source: 'Email', contact: 'Mike', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
      { source: 'FB', contact: 'Wheeler', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
      { source: 'Call', contact: 'William', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
      { source: 'WhatsApp', contact: 'Byers', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
      { source: 'ABC', contact: 'Max', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
      { source: 'Email', contact: 'Lucas', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
      { source: 'FB', contact: 'Dusty', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
    ])
});
// END-SNIPPET