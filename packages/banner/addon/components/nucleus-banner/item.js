import { tagName, layout as templateLayout } from '@ember-decorators/component';
import { reads } from '@ember/object/computed';
import Component from '@ember/component';
import { get, action, computed } from '@ember/object';
import layout from "../../templates/components/nucleus-banner/item";
import { ICON_MAP } from '../../constants/nucleus-banner';

/**
  @class Nucleus Banner Item
  @namespace Components
  @extends Ember.Component
  @public
*/
@templateLayout(layout)
@tagName('')
class Item extends Component {
  /**
  * Banner item
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
  * @field bannerItem
  * @type object
  * @public
  */
  @reads('item')
  bannerItem;

  /**
  * bannerIcon
  *
  * @computed bannerIcon
  * @private
  */
  @computed('bannerItem.type')
  get bannerIcon() {
    let type = get(this, 'bannerItem.type');
    return type && type in ICON_MAP ? ICON_MAP[type] : null;
  }

  /**
  * Closure action that gets invoked on clicking the close button.
  *
  * @method onClose
  * @public
  * @param {object} item
  */
  @action
  onClose(item) {
    get(this, 'onDelete') && get(this, 'onDelete')(item);
    typeof item.onClose === 'function' && item.onClose();
  }
}

export default Item;