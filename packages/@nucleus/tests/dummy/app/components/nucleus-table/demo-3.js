// BEGIN-SNIPPET table-component3.js
import Component from '@ember/component';
import { A } from '@ember/array';
export default Component.extend({
  selectAll: true,
  columns: A([
      { name: 'Source', valuePath: 'source', selected: true, disabled: false},
      { name: 'Contact', valuePath: 'contact', selected: true, disabled: true},
      { name: 'Status', valuePath: 'status', selected: false, disabled: false},
      { name: 'PhNo', valuePath: 'phno', selected: true, disabled: false},
      { name: 'Subject', valuePath: 'subject', selected: false, disabled: false},
    ]),
  rows: A([
      { source: 'FB', contact: 'Gandalf', phno: '913', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'D' },
      { source: 'Twitter', contact: 'Severus', phno: '915', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'E' },
      { source: 'Call', contact: 'Alan', phno: '916', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'F' },
      { source: 'ABC', contact: 'Snape', phno: '917', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'G' },
      { source: 'WhatsApp', contact: 'Wheeler', phno: '918', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'H' },
      { source: 'ABC', contact: 'Joyce', phno: '919', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'I' },
      { source: 'Email', contact: 'Byers', phno: '920', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'J' },
      { source: 'FB', contact: 'El - Eleven', phno: '921', subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', status: 'K' },
    ]),

  actions: {
    allSelect() {
      this.toggleProperty(this.selectAll);
    }
  }
 
});
// END-SNIPPET