import { scheduleOnce } from '@ember/runloop';
import Component from '@ember/component';
import { observer, computed, get, set } from '@ember/object';
import { equal, or }  from '@ember/object/computed';
import layout from "../templates/components/nucleus-button";

export default Component.extend({
  layout,
  tagName: 'button',
  classNames: ['btn'],
  classNameBindings: ['active', 'block:btn-block', 'sizeClass', 'typeClass', 'customClass'],
  attributeBindings: ['_disabled:disabled', '_buttonType:type', 'title', 'autofocus'],
  
  label: null,

  size: null,

  type: 'primary',

  _buttonType: 'button',

  active: false,

  autofocus: false,

  block: false,

  icon: null,

  customClass: null,

  disabled: null,

  _disabled: computed('disabled', 'isPending', 'preventConcurrency', function() {
    let isDisabled = get(this, 'disabled');
    return isDisabled ? isDisabled : get(this, 'isPending') && get(this, 'preventConcurrency');
  }),

  value: null,

  preventConcurrency: true,

  state: 'default',

  isPending: equal('state', 'pending'),

  isFulfilled: equal('state', 'fulfilled'),
  
  isRejected: equal('state', 'rejected'),

  isSettled: or('isFulfilled', 'isRejected'),

  pendingLabel: undefined,
  
  successLabel: undefined,

  failureLabel: undefined,


  sizeClass: computed('size', function() {
    let size = get(this, 'size');
    return size ? `btn--${size}`: null;
  }),

  typeClass: computed('type', function() {
    let type = get(this, 'type');
    return (type) ? `btn--${get(this, 'type')}` : 'btn--primary';
  }),

  onClick: null,

  text: computed('state', 'label', 'pendingLabel', 'successLabel', 'failureLabel', function() {
    let state = get(this, 'state');
    return (state === 'default') ? get(this, 'label') : get(this, `${state}Text`);
  }),

  title: computed.reads('text'),

  reset: null,

  resetState() {
    set(this, 'state', 'default');
  },

  resetObserver: observer('reset', function() {
    if (get(this, 'reset')) {
      scheduleOnce('actions', this, 'resetState');
    }
  }),
  
  click() {
    let action = get(this, 'onClick');
    let preventConcurrency = get(this, 'preventConcurrency');

    if (action === null || action === undefined) {
      return;
    }

    if (!preventConcurrency || !get(this, 'isPending')) {
      let promise = (action)(get(this, 'value'));
      if (promise && typeof promise.then === 'function' && !get(this, 'isDestroyed')) {
        set(this, 'state', 'pending');
        promise.then(() => {
          if (!get(this, 'isDestroyed')) {
            set(this, 'state', 'fulfilled');
          }
        }, () => {
          if (!get(this, 'isDestroyed')) {
            set(this, 'state', 'rejected');
          }
        }
        );
      }
    }

    return false;
  },

  init() {
    this._super(...arguments);
    get(this, 'reset');
  }
});
