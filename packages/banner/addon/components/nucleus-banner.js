import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { reads, gt } from '@ember/object/computed';
import layout from "../templates/components/nucleus-banner";
import { computed, get, observer } from '@ember/object';

/**
  __Usage:__
  [Refer component page](/docs/components/nucleus-banner)

  @class Nucleus Banner
  @namespace Components
  @extends Ember.Component
  @public
*/
export default Component.extend({
  layout,

  /**
  * Service which holds the array of banner items
  *
  * @field nucleusBanner
  * @type function
  * @private
  */
  nucleusBanner: service(),

  /**
  * Show/hide the number of stacked notifications
  *
  * @field _isShowMore
  * @type boolean
  * @private
  */
  _isShowMore: false,

  /**
  * Flag to toggle the position of the banner between `absolute` & `fixed`.
  *
  * @field isFixed
  * @type boolean
  * @public
  */
  isFixed: false,

  /**
  * List of banner items to be rendered.
  *
  * @field bannerItems
  * @type array
  * @public
  */
  bannerItems: reads('nucleusBanner.items'),

  /**
  * _isMultiple
  *
  * @field _isMultiple
  * @type function
  * @private
  */
  _isMultiple: gt('bannerItems.length', 1),

  /**
  * Banner item that gets displayed.
  *
  * @field displayedItem
  * @type object
  * @public
  */
  displayedItem: computed('bannerItems.[]', function () {
    let items = get(this, 'bannerItems');
    return items && items.length > 0 ? items[0] : null;
  }),

  /**
  * Stacked banner items.
  *
  * @computed stackedItems
  * @private
  */
  stackedItems: computed('_isMultiple', 'bannerItems.[]', function () {
    return get(this, '_isMultiple') ? get(this, 'bannerItems').slice(1) : null;
  }),
  actions: {
    /**
    * Toggle action to show or hide the stacked notifications.
    *
    * @method toggleShowMore
    * @public
    *
    */
    toggleShowMore() {
      this.toggleProperty('_isShowMore');
    },

    /**
    * Action that gets invoked on clicking the close button.
    *
    * @method deleteItem
    * @public
    * @param {object} bannerItem
    */
    deleteItem(item) {
      get(this, 'nucleusBanner').remove(item);
    }

  },

  /**
  * _observeOpen
  *
  * @field _observeOpen
  * @type function
  * @private
  */
  _observeOpen: observer('bannerItems.[]', function () {  // eslint-disable-line
    if (get(this, 'bannerItems').length > 0) {
      this._injectBodyClass();
    } else {
      this._removeBodyClass();
    }
  }),

  /**
  * _injectBodyClass
  *
  * @method _injectBodyClass
  * @private
  *
  */
  _injectBodyClass() {
    document.body.classList.add("nucleus-banner--active");
  },

  /**
  * _removeBodyClass
  *
  * @method _removeBodyClass
  * @private
  *
  */
  _removeBodyClass() {
    document.body.classList.remove("nucleus-banner--active");
  }

});