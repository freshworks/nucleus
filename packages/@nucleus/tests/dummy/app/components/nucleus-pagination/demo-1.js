// BEGIN-SNIPPET pagination-component.js
import Component from '@ember/component';
import { A } from '@ember/array';

export default Component.extend({
  listItems:  A(['Item A', 'Item B', 'Item C', 'Item D', 'Item E', 'Item F', 'Item G',
    'Item H', 'Item I', 'Item J', 'Item K', 'Item L', 'Item M', 'Item N', 'Item O', 'Item P'
    ])
});
// END-SNIPPET