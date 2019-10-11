import { or } from '@ember/object/computed';
import Component from '@ember/component';
import { get, set } from '@ember/object';
import { computed } from '@ember/object';
import layout from '../templates/components/nucleus-inline-banner';

const typeIconMap = {
  'tip': 'bulb',
  'info': 'info',
  'warning': 'warning',
  'error': 'error'
};

export default Component.extend({
  layout,
  classNames: ['nucleus-inline-banner'],
  classNameBindings: ['_typeClass'],
  attributeBindings: ['data-test-id'],
  'data-test-id': 'nucleus-inline-banner',
  type: 'tip', // ['tip', 'info', 'warning', 'error']
  icon: 'Info',
  size: 'large',
  showCloseIcon: true,
  isOpen: true,
  isLinkAction: or('linkHref', 'linkAction'),
  _typeClass: computed('type', 'isOpen', function() {
    let type = get(this, 'type');
    let isOpen = get(this, 'isOpen');
    return (type && isOpen) ? `nucleus-inline-banner--${type}` : null;
  }),
  typeIcon: computed('type', function() {
    return typeIconMap[get(this, 'type')];
  }),
  actions: {
    onCloseTip() {
      if (get(this, 'onClose')) {
        set(this, 'isOpen', false);
        return get(this, 'onClose')();
      }
      set(this, 'isOpen', false);
    },
    onLinkAction() {
      get(this, 'linkAction')();
    }
  }
});
