// BEGIN-SNIPPET pagination-component2.js
import Component from '@ember/component';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Component.extend({
  listItems: computed(function() {
    return A(['Item A', 'Item B', 'Item C', 'Item D', 'Item E', 'Item F', 'Item G',
    'Item H', 'Item I', 'Item J', 'Item K', 'Item L', 'Item M', 'Item N', 'Item O', 'Item P'
    ]);
  })
});
// END-SNIPPET