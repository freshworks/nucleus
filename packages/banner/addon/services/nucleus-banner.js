import { A } from '@ember/array';
import Service from '@ember/service';
import { set, get } from '@ember/object';
import { DEFAULT_CONFIG } from '../constants/nucleus-banner';

/**
  @class nucleus-banner
  @namespace Service
  @extends Ember.Service
  @public
*/
export default Service.extend({
  /**
  * ``` javascript
  * {
  *   title: 'title',
  *   type: 'success',
  *   isDismissible: true,
  *   content: {
  *     linkAction: this.someAction.bind(this),
  *     linkText: 'Click here'
  *   },
  *   componentName: 'some-component-name',
  *   componentProps: {}
  * }
  * ```
  *
  * @field items
  * @type null
  * @public
  */
  items: null,

  /**
  * init
  *
  * @method init
  * @private
  *
  */
  init() {
    this._super(...arguments);
    set(this, 'items', A([]));
  },

  /**
  * Add an item with DEFAULT_CONFIG
  *
  * @method add
  * @public
  * @param {object} item
  */
  add(item) {
    get(this, 'items').pushObject(Object.assign({}, DEFAULT_CONFIG, item));
  },

  /**
  * Remove an item
  *
  * @method remove
  * @public
  * @param {object} item
  */
  remove(item) {
    get(this, 'items').removeObject(item);
  },

  /**
  * empty
  *
  * @method empty
  * @public
  *
  */
  empty() {
    get(this, 'items').clear();
  }

});