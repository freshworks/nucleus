import { scheduleOnce } from '@ember/runloop';
import Component from '@ember/component';
import { observer, computed, get, set } from '@ember/object';
import { equal, or } from '@ember/object/computed';
import layout from "../templates/components/nucleus-button";

/**
  NucleusButton Usage:
  @class NucleusButton
  @namespace Components
  @extends Ember.Component
  @public
*/
export default Component.extend({
  layout,
  tagName: 'button',
  classNames: ['btn'],
  classNameBindings: ['active', 'block:btn--block', 'sizeClass', 'typeClass', 'customClass'],
  attributeBindings: ['_disabled:disabled', '_buttonType:type', 'title', 'autofocus'],

  /**
  * label
  *
  * @field label
  * @type null
  * @public
  */
  label: null,

  /**
  * size
  *
  * @field size
  * @type null
  * @public
  */
  size: null,

  /**
  * type
  *
  * @field type
  * @type string
  * @public
  */
  type: 'primary',

  /**
  * _buttonType
  *
  * @field _buttonType
  * @type string
  * @private
  */
  _buttonType: 'button',

  /**
  * active
  *
  * @field active
  * @type boolean
  * @public
  */
  active: false,

  /**
  * autofocus
  *
  * @field autofocus
  * @type boolean
  * @public
  */
  autofocus: false,

  /**
  * block
  *
  * @field block
  * @type boolean
  * @public
  */
  block: false,

  /**
  * icon
  *
  * @field icon
  * @type null
  * @public
  */
  icon: null,

  /**
  * customClass
  *
  * @field customClass
  * @type null
  * @public
  */
  customClass: null,

  /**
  * disabled
  *
  * @field disabled
  * @type null
  * @public
  */
  disabled: null,

  /**
  * _disabled
  *
  * @computed _disabled
  * @private
  */
  _disabled: computed('disabled', '_isPending', 'preventConcurrency', function () {
    let isDisabled = get(this, 'disabled');
    return isDisabled ? isDisabled : get(this, '_isPending') && get(this, 'preventConcurrency');
  }),

  /**
  * value
  *
  * @field value
  * @type null
  * @public
  */
  value: null,

  /**
  * preventConcurrency
  *
  * @field preventConcurrency
  * @type boolean
  * @public
  */
  preventConcurrency: true,

  /**
  * state
  *
  * @field state
  * @type string
  * @public
  */
  state: 'default',

  /**
  * _isPending
  *
  * @field _isPending
  * @type function
  * @private
  */
  _isPending: equal('state', 'pending'),

  /**
  * _isFulfilled
  *
  * @field _isFulfilled
  * @type function
  * @private
  */
  _isFulfilled: equal('state', 'fulfilled'),

  /**
  * _isRejected
  *
  * @field _isRejected
  * @type function
  * @private
  */
  _isRejected: equal('state', 'rejected'),

  /**
  * _isSettled
  *
  * @field _isSettled
  * @type function
  * @private
  */
  _isSettled: or('_isFulfilled', '_isRejected'),

  /**
  * pendingLabel
  *
  * @field pendingLabel
  * @type undefined
  * @public
  */
  pendingLabel: "Pending...",

  /**
  * successLabel
  *
  * @field successLabel
  * @type undefined
  * @public
  */
  successLabel: "Success!",

  /**
  * failureLabel
  *
  * @field failureLabel
  * @type undefined
  * @public
  */
  failureLabel: "Failed!",

  /**
  * sizeClass
  *
  * @computed sizeClass
  * @private
  */
  sizeClass: computed('size', function () {
    let size = get(this, 'size');
    return size ? `btn--${size}` : null;
  }),

  /**
  * typeClass
  *
  * @computed typeClass
  * @private
  */
  typeClass: computed('type', function () {
    let type = get(this, 'type');
    return type ? `btn--${get(this, 'type')}` : 'btn--primary';
  }),

  /**
  * onClick
  *
  * @field onClick
  * @type null
  * @public
  */
  onClick: null,

  /**
  * text
  *
  * @computed text
  * @private
  */
  text: computed('state', 'label', 'pendingLabel', 'successLabel', 'failureLabel', function () {
    let state = get(this, 'state');
    return state === 'default' ? get(this, 'label') : get(this, `${state}Label`);
  }),

  /**
  * title
  *
  * @field title
  * @type function
  * @private
  */
  title: computed.reads('text'),

  /**
  * reset
  *
  * @field reset
  * @type null
  * @private
  */
  reset: null,

  /**
  * resetState
  *
  * @method resetState
  * @public
  *
  */
  resetState() {
    set(this, 'state', 'default');
  },

  /**
  * resetObserver
  *
  * @field resetObserver
  * @type function
  * @public
  */
  resetObserver: observer('reset', function () {
    if (get(this, 'reset')) {
      scheduleOnce('actions', this, 'resetState');
    }
  }),

  /**
  * click
  *
  * @method click
  * @public
  *
  */
  click() {
    let action = get(this, 'onClick');
    let preventConcurrency = get(this, 'preventConcurrency');

    if (action === null || action === undefined) {
      return;
    }

    if (!preventConcurrency || !get(this, '_isPending')) {
      let promise = action(get(this, 'value'));

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
        });
      }
    }

    return false;
  },

  /**
  * init
  *
  * @method init
  * @public
  *
  */
  init() {
    this._super(...arguments);
    get(this, 'reset');
  }
});