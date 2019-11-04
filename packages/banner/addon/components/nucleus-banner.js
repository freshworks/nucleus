import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { reads, gt } from '@ember/object/computed';
import layout from "../templates/components/nucleus-banner";
import { computed, get, observer } from '@ember/object';

export default Component.extend({
  layout,
  nucleusBanner: service(),
  isShowMore: false,
  bannerItems: reads('nucleusBanner.items'),
  isMultiple: gt('bannerItems.length', 1),
  displayedItem: reads('bannerItems.firstObject'),
  stackedItems: computed('isMultiple', 'bannerItems.[]', function() {
    return get(this, 'isMultiple') ? get(this, 'bannerItems').slice(1) : null;
  }),
  actions: {
    toggleShowMore() {
      this.toggleProperty('isShowMore');
    }
  },
  _observeOpen: observer('bannerItems.[]', function() { // eslint-disable-line
    if (get(this, 'bannerItems').length > 0) {
      this._injectBodyClass();
    }
  }),
  _injectBodyClass() {
    document.body.classList.add("nucleus-banner--active");
  }
});