import { layout as templateLayout } from '@ember-decorators/component';
import defaultProp from '@freshworks/core/utils/default-decorator';
import { observes } from '@ember-decorators/object';
import { inject } from '@ember/service';
import { gt } from '@ember/object/computed';
import Component from '@ember/component';
import layout from "../templates/components/nucleus-banner";
import { action, computed } from '@ember/object';

/**
  __Usage:__
  [Refer component page](/docs/components/nucleus-banner)

  @class Nucleus Banner
  @namespace Components
  @extends Ember.Component
  @public
*/
@templateLayout(layout)
class NucleusBanner extends Component {
  /**
  * Service which holds the array of banner items
  *
  * @field nucleusBanner
  * @type function
  * @private
  */
  @inject('nucleus-banner')
  bannerService;

  /**
  * Show/hide the number of stacked notifications
  *
  * @field _isShowMore
  * @type boolean
  * @private
  */
  _isShowMore = false;

  /**
  * Flag to toggle the position of the banner between `absolute` & `fixed`.
  *
  * @field isFixed
  * @type boolean
  * @public
  */
  @defaultProp
  isFixed = false;
  
  /**
  * Text to be used for localisation of additional banner items message
  *
  * @field showMore
  * @type string
  * @public
  */
 @defaultProp
 showMore = 'more';

 /**
  * Text to be used for localisation of System Alerts message
  *
  * @field systemAlerts
  * @type string
  * @public
  */
 @defaultProp
 systemAlerts = 'System Alerts';

  /**
  * List of banner items to be rendered.
  *
  * @field bannerItems
  * @type array
  * @public
  */
  @computed('bannerService.items')
  get bannerItems() {
    let bannerService = this.get('bannerService');
    return bannerService ? bannerService.get('items') : null;
  }

  /**
  * _isMultiple
  *
  * @field _isMultiple
  * @type function
  * @private
  */
  @gt('bannerItems.length', 1)
  _isMultiple;

  /**
  * Banner item that gets displayed.
  *
  * @field displayedItem
  * @type object
  * @public
  */
  @computed('bannerItems.[]')
  get displayedItem() {
    let items = this.get('bannerItems');
    return items && items.length > 0 ? items[0] : null;
  }

  /**
  * Stacked banner items.
  *
  * @computed stackedItems
  * @private
  */
  @computed('_isMultiple', 'bannerItems.[]')
  get stackedItems() {
    return this.get('_isMultiple') ? this.get('bannerItems').slice(1) : null;
  }

  /**
  * Toggle action to show or hide the stacked notifications.
  *
  * @method toggleShowMore
  * @public
  *
  */
  @action
  toggleShowMore() {
    this.toggleProperty('_isShowMore');
  }

  /**
  * Action that gets invoked on clicking the close button.
  *
  * @method deleteItem
  * @public
  * @param {object} bannerItem
  */
  @action
  deleteItem(item) {
    this.get('bannerService').remove(item);
  }

  /**
  * _observeOpen
  *
  * @field _observeOpen
  * @type function
  * @private
  */
  @observes('bannerItems.[]') // eslint-disable-line
  _observeOpen() {
    if (this.get('bannerItems').length > 0) {
      this._injectBodyClass();
    } else {
      this._removeBodyClass();
    }
  }

  /**
  * _injectBodyClass
  *
  * @method _injectBodyClass
  * @private
  *
  */
  _injectBodyClass() {
    document.body.classList.add("nucleus-banner--active");
  }

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
}

export default NucleusBanner;
