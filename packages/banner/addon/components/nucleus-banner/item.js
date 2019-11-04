import Component from '@ember/component';
import { reads } from '@ember/object/computed';
import { computed, get } from '@ember/object';

import layout from "../../templates/components/nucleus-banner/item";
import { ICON_MAP } from '../../constants/nucleus-banner';

export default Component.extend({
  layout,
  tagName: '',
  bannerItem: reads('item'),
  bannerIcon: computed('bannerItem.type', function() {
    let type = get(this, 'bannerItem.type');
    return (type && type in ICON_MAP) ? ICON_MAP[type] : null;
  }),
  actions: {
    onClose(item) {
      get(this, 'onDelete') && get(this, 'onDelete')(item);
    }
  }
});