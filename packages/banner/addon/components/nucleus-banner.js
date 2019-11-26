import classic from 'ember-classic-decorator';
import { layout as templateLayout } from '@ember-decorators/component';
import { observes } from '@ember-decorators/object';
import { inject as service } from '@ember/service';
import { gt, reads } from '@ember/object/computed';
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
@classic
@templateLayout(layout)
class NucleusBanner extends Component {
  /**
  * Service which holds the array of banner items
  *
  * @field nucleusBanner
  * @type function
  * @private
  */
  @service
  nucleusBanner;

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
  isFixed = false;

  /**
  * List of banner items to be rendered.
  *
  * @field bannerItems
  * @type array
  * @public
  */
  @reads('nucleusBanner.items')
  bannerItems;

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
    let items = this.bannerItems;
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
    return this._isMultiple ? this.bannerItems.slice(1) : null;
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
    this.nucleusBanner.remove(item);
  }

  /**
  * _observeOpen
  *
  * @field _observeOpen
  * @type function
  * @private
  */
  @observes('bannerItems.[]')
  _observeOpen() {
    if (this.bannerItems.length > 0) {
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