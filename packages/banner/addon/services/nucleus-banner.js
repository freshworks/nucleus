import { A } from '@ember/array';
import Service from '@ember/service';
import { DEFAULT_CONFIG } from '../constants/nucleus-banner';

/**
  @class nucleus-banner
  @namespace Service
  @extends Ember.Service
  @public
*/
class NucleusBanner extends Service {
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
  items = A([]);

  /**
  * init
  *
  * @method init
  * @private
  *
  */
  init() {
    super.init(...arguments);
  }

  /**
  * Add an item with DEFAULT_CONFIG
  *
  * @method add
  * @public
  * @param {object} item
  */
  add(item) {
    this.items.pushObject(Object.assign({}, DEFAULT_CONFIG, item));
  }

  /**
  * Remove an item
  *
  * @method remove
  * @public
  * @param {object} item
  */
  remove(item) {
    this.items.removeObject(item);
  }

  /**
  * empty
  *
  * @method empty
  * @public
  *
  */
  empty() {
    this.items.clear();
  }
}

export default NucleusBanner;