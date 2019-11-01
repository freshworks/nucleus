import { A } from '@ember/array';
import Service from '@ember/service';

export default Service.extend({
  items: null,

  init() {
    this._super(...arguments);
    this.set('items', A([
      {
        content: 'shibu',
        type: 'success'
      },
      {
        content: 'lijack',
        type: 'danger'
      }
    ]));
  },

  add(item) {
    this.items.pushObject(item);
  },

  remove(item) {
    this.items.removeObject(item);
  },

  empty() {
    this.items.clear();
  }
});