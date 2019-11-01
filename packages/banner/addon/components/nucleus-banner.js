import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { reads, gt } from '@ember/object/computed';
import layout from "../templates/components/nucleus-banner";
import { computed, get } from '@ember/object';
// import { slice } from '@ember/array';

export default Component.extend({
  layout,
  nucleusBanner: service(),
  bannerItems: reads('nucleusBanner.items'),
  isMultiple: gt('bannerItems.length', 0),
  displayedItem: reads('bannerItems.firstObject'),
  hiddenItems: computed('isMultiple', 'bannerItems.[]', function() {
    let isMultiple = get(this, 'isMultiple');
    if (isMultiple) {
      return get(this, 'bannerItems').slice(1);
    }
    return null;
  })
});