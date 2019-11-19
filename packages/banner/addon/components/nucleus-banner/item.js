import Component from '@ember/component';
import { reads } from '@ember/object/computed';
import { computed, get } from '@ember/object';
import layout from "../../templates/components/nucleus-banner/item";
import { ICON_MAP } from '../../constants/nucleus-banner';

/**
  @class Nucleus Banner Item
  @namespace Components
  @extends Ember.Component
  @public
*/
export default Component.extend({
  layout,
  tagName: '',

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
  bannerItem: reads('item'),

  /**
  * bannerIcon
  *
  * @computed bannerIcon
  * @private
  */
  bannerIcon: computed('bannerItem.type', function () {
    let type = get(this, 'bannerItem.type');
    return type && type in ICON_MAP ? ICON_MAP[type] : null;
  }),
  actions: {
    /**
    * Closure action that gets invoked on clicking the close button.
    *
    * @method onClose
    * @public
    * @param {object} item
    */
    onClose(item) {
      get(this, 'onDelete') && get(this, 'onDelete')(item);
    }

  }
});