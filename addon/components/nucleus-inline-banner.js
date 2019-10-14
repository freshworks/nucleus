import Component from '@ember/component';
import { get, set } from '@ember/object';
import { computed } from '@ember/object';
import layout from '../templates/components/nucleus-inline-banner';

const typeIconMap = {
  'tip': 'bulb',
  'info': 'Info',
  'success': 'Success',
  'warning': 'Warning',
  'danger': 'Danger'
};

export default Component.extend({
  layout,
  classNames: ['nucleus-inline-banner'],
  classNameBindings: ['_typeClass'],
  attributeBindings: ['data-test-id'],
  'data-test-id': 'nucleus-inline-banner',
  type: 'tip', // ['tip', 'info', 'warning', 'success' ,'danger']
  isDismissible: true,
  isOpen: true,
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
