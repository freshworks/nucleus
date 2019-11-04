import Component from '@ember/component';
import { reads } from '@ember/object/computed';
import layout from "../../templates/components/nucleus-banner/item";

export default Component.extend({
  layout,
  bannerItem: reads('item')
});