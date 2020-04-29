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
      { name: 'Sub2', valuePath: 'sub2', selected: false, disabled: false},
      { name: 'Sub3', valuePath: 'sub3', selected: false, disabled: false},
      { name: 'Sub4', valuePath: 'sub4', selected: false, disabled: false},
      { name: 'Sub5', valuePath: 'sub5', selected: false, disabled: false},
      { name: 'Sub6', valuePath: 'sub6', selected: false, disabled: false},
    ]),
  rows: A([
      { source: 'Twitter', contact: 'Albus', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D', sub2: '1', sub3: '2', sub4: '2', sub5: '2', sub6: '1' },
      { source: 'WhatsApp', contact: 'Percival', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D', sub2: '1', sub3: '2', sub4: '2', sub5: '2', sub6: '1' },
      { source: 'FB', contact: 'Wulfric', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D', sub2: '1', sub3: '2', sub4: '2', sub5: '2', sub6: '1' },
      { source: 'Call', contact: 'Brian', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D', sub2: '1', sub3: '2', sub4: '2', sub5: '2', sub6: '1'},
      { source: 'Email', contact: 'Dumbledore', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D', sub2: '1', sub3: '2', sub4: '2', sub5: '2', sub6: '1' },
      { source: 'FB', contact: 'Gandalf', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D', sub2: '1', sub3: '2', sub4: '2', sub5: '2', sub6: '1' },
      { source: 'Twitter', contact: 'Severus', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D', sub2: '1', sub3: '2', sub4: '2', sub5: '2', sub6: '1' },
      { source: 'Call', contact: 'Alan', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D', sub2: '1', sub3: '2', sub4: '2', sub5: '2', sub6: '1' },
      { source: 'ABC', contact: 'Snape', phno: '914', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D', sub2: '1', sub3: '2', sub4: '2', sub5: '2', sub6: '1' },
    ])
});
// END-SNIPPET