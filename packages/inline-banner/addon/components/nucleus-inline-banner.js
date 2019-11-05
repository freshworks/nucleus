import Component from '@ember/component';
import { get, set } from '@ember/object';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';
import layout from '../templates/components/nucleus-inline-banner';

const typeIconMap = {
  'info': 'circle-help',
  'success': 'circle-check',
  'warning': 'circle-info',
  'danger': 'circle-cross'
};

export default Component.extend({
  layout,
  classNames: ['nucleus-inline-banner'],
  classNameBindings: ['_typeClass', 'isOpen:show:hide'],
  attributeBindings: ['data-test-id'],
  'data-test-id': 'nucleus-inline-banner',
  type: 'info', // ['info', 'warning', 'success' ,'danger']
  isDismissible: true,
  isOpen: true,
  title: null,
  _title: computed('title', function() {
    return htmlSafe(get(this, 'title'));
  }),
  _typeClass: computed('type', 'isOpen', function() {
    let type = get(this, 'type');
    let isOpen = get(this, 'isOpen');
    return (type && isOpen) ? `nucleus-inline-banner--${type}` : null;
  }),
  _icon: computed('type', function() {
    return typeIconMap[get(this, 'type')];
  }),
  actions: {
    onCloseTip() {
      if (get(this, 'onClose')) {
        set(this, 'isOpen', false);
        return get(this, 'onClose')();
      }
      set(this, 'isOpen', false);
    }
  }
});
