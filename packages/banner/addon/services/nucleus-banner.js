import { A } from '@ember/array';
import Service from '@ember/service';
import { set, get } from '@ember/object';
import { DEFAULT_CONFIG } from '../constants/nucleus-banner'

export default Service.extend({
  items: null,

  init() {
    this._super(...arguments);
    set(this, 'items', A([]));
  },

  add(item) {
    get(this, 'items').pushObject(Object.assign({}, DEFAULT_CONFIG, item));
  },

  remove(item) {
    get(this, 'items').removeObject(item);
  },

  empty() {
    get(this, 'items').clear();
  }
});