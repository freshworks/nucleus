import { A } from '@ember/array';
import Service from '@ember/service';
import { set, get } from '@ember/object';

/**
 * {
 *    'title': 'Lorem ipsum',
 *    'type': 'danger',
 *    'content': {
 *      'linkText': 'Action',
 *      'linkAction': this.testAction.bind(this)
 *    }
 * }
 */

export default Service.extend({
  items: null,

  init() {
    this._super(...arguments);
    set(this, 'items', A([]));
  },

  add(item) {
    get(this, 'items').pushObject(item);
  },

  remove(item) {
    get(this, 'items').removeObject(item);
  },

  empty() {
    get(this, 'items').clear();
  }
});