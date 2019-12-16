import { A } from '@ember/array';
import Service from '@ember/service';
import defaultProp from '@freshworks/core/utils/default-decorator';
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
  @defaultProp
  items = A([]);

  /**
  * Add an item with DEFAULT_CONFIG
  *
  * @method add
  * @public
  * @param {object} item
  */
  add(item) {
    this.get('items').pushObject(Object.assign({}, DEFAULT_CONFIG, item));
  }

  /**
  * Remove an item
  *
  * @method remove
  * @public
  * @param {object} item
  */
  remove(item) {
    this.get('items').removeObject(item);
  }

  /**
  * empty
  *
  * @method empty
  * @public
  *
  */
  empty() {
    this.get('items').clear();
  }
}

export default NucleusBanner;
