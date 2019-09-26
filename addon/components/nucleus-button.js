import { run } from '@ember/runloop';
import Component from '@ember/component';
import { computed, get, set, getWithDefault } from '@ember/object';
import { equal } from '@ember/object/computed';
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
  attributeBindings: ['_disabled:disabled', '_buttonType:type', 'title:aria-label', 'autofocus'],

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
  _disabled: computed('disabled', 'isPending', function () {
    let isDisabled = get(this, 'disabled');
    return isDisabled ? isDisabled : get(this, 'isPending');
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
  * state
  *
  * @field state
  * @type string
  * @public
  */
  state: 'default',

  /**
  * isPending
  *
  * @field isPending
  * @type function
  * @public
  */
  isPending: equal('state', 'pending'),

  /**
  * isFulfilled
  *
  * @field isFulfilled
  * @type function
  * @public
  */
  isFulfilled: equal('state', 'fulfilled'),

  /**
  * isRejected
  *
  * @field isRejected
  * @type function
  * @public
  */
  isRejected: equal('state', 'rejected'),

  /**
  * pendingLabel
  *
  * @field pendingLabel
  * @type undefined
  * @public
  */
  pendingLabel: undefined,

  /**
  * successLabel
  *
  * @field successLabel
  * @type undefined
  * @public
  */
  fulfilledLabel: undefined,

  /**
  * failureLabel
  *
  * @field failureLabel
  * @type undefined
  * @public
  */
  rejectedLabel: undefined,

  /**
  * ariaLabel
  *
  * @field ariaLabel
  * @type undefined
  * @public
  */
  ariaLabel: null,

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
  text: computed('state', 'label', function () {
    let state = get(this, 'state');
    return state === 'default' 
    ? get(this, 'label') 
    : getWithDefault(this, `${state}Label`, get(this, 'label'));
  }),

  /**
  * title
  *
  * @field title
  * @type function
  * @private
  */
  title: computed('text', 'ariaLabel', 'icon', function() {
    return get(this, 'text') || get(this, 'ariaLabel') || get(this, 'icon');
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

    if (action === null || action === undefined) {
      return;
    }

    if (!get(this, 'isPending')) {
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
        })
        .finally(() => {
          run.later(() => {
            set(this, 'state', 'default')
          }, 1000);
        });
      }
    }
    return false;
  },
});