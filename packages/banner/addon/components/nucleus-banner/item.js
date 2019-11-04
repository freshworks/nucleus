import Component from '@ember/component';
import { reads } from '@ember/object/computed';
import layout from "../../templates/components/nucleus-banner/item";
import { computed, get } from '@ember/object';

const ICON_MAP = {
  'success': 'circle-check',
  'danger': 'circle-cross',
  'warning': 'circle-info',
  'info': 'circle-help'
}

export default Component.extend({
  layout,
  bannerItem: reads('item'),
  bannerIcon: computed('bannerItem.type', function() {
    let type = get(this, 'bannerItem.type');
    return (type && type in ICON_MAP) ? ICON_MAP[type] : null;
  })
});