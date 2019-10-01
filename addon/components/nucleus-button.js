import { run } from '@ember/runloop';
import Component from '@ember/component';
import { computed, get, set, getWithDefault } from '@ember/object';
import { equal, or } from '@ember/object/computed';
import layout from "../templates/components/nucleus-button";
import { BUTTON_STATE } from "../constants/nucleus-button";

/**
  __Usage:__

  [Refer component page](/docs/components/nucleus-button)

  @class Nucleus Button
  @namespace Components
  @extends Ember.Component
  @public
*/
export default Component.extend({
  layout,
  tagName: 'button',
  classNames: ['btn'],
  classNameBindings: ['active', 'block:btn--block', '_sizeClass', '_typeClass', 'customClass'],
  attributeBindings: ['_disabled:disabled', '_buttonType:type', '_label:aria-label', 'autofocus'],

  /**
  * Default button text
  *
  * @field label
  * @type string|null
  * @default null
  * @public
  */
  label: null,

  /**
  * Button sizes: `default` & `mini`
  *
  * @field size
  * @type string
  * @default null
  * @public
  */
  size: null,

  /**
  * Button display types: `primary`, `secondary`, `danger` & `link`
  *
  * @field type
  * @type string
  * @default 'primary'
  * @public
  */
  type: 'primary',

  /**
  * Attribute bound to button type
  *
  * @field _buttonType
  * @type string
  * @private
  */
  _buttonType: 'button',

  /**
  * Class name `active` added if set to true
  *
  * @field active
  * @type boolean
  * @default false
  * @public
  */
  active: false,

  /**
  * Flag to set autofocus
  *
  * @field autofocus
  * @type boolean
  * @default false
  * @public
  */
  autofocus: false,

  /**
  * Flag to set button as full width block.
  *
  * @field block
  * @type boolean
  * @default false
  * @public
  */
  block: false,

  /**
  * Icon name used in svg-jar.
  *
  * @field icon
  * @type string|null
  * @public
  */
  icon: null,

  /**
  * Custom class names to be added to the button.
  *
  * @field customClass
  * @type string
  * @public
  */
  customClass: null,

  /**
  * Flag to set disabled attribute
  *
  * @field disabled
  * @type boolean
  * @default false
  * @public
  */
  disabled: false,

  /**
  * _disabled
  *
  * @computed _disabled
  * @private
  */
  _disabled: computed('disabled', '_isPending', function () {
    let isDisabled = get(this, 'disabled');
    return isDisabled ? isDisabled : get(this, '_isPending');
  }),

  /**
  * Value to be passed as argument for `onClick` action
  *
  * @field value
  * @type string|number|object
  * @public
  */
  value: null,

  /**
  * Timeout after which the default label replaces fulfilled/rejected label.
  *
  * @field labelTimeout
  * @type number
  * @default 100
  * @public
  */
  labelTimeout: 1000,

  /**
  * Internal button _buttonState management utility
  *
  * @field _buttonState
  * @type string
  * @private
  */
  _buttonState: BUTTON_STATE.DEFAULT,

  /**
  * _isPending
  *
  * @field _isPending
  * @type boolean
  * @private
  */
  _isPending: equal('_buttonState', BUTTON_STATE.PENDING),

  /**
  * _isFulfilled
  *
  * @field _isFulfilled
  * @type boolean
  * @private
  */
  _isFulfilled: equal('_buttonState', BUTTON_STATE.FULFILLED),

  /**
  * _isRejected
  *
  * @field _isRejected
  * @type boolean
  * @private
  */
  _isRejected: equal('_buttonState', BUTTON_STATE.REJECTED),

  /**
  * _isLoading
  *
  * @field _isLoading
  * @type boolean
  * @private
  */
  _isLoading: or('_isPending', '_isFulfilled', '_isRejected'),

  /**
  * To display animated checkmark
  *
  * @field _isLoadingComplete
  * @type boolean
  * @private
  */
  _isLoadingComplete: or('_isFulfilled', '_isRejected'),

  /**
  * Show loading animation only if custom state labels are not specified
  *
  * @field _isShowLoading
  * @type boolean
  * @private
  */
  _isShowLoading: computed('_isLoading', 'pendingLabel', 'fulfilledLabel', 'rejectedLabel', function() {
    return !(get(this, 'pendingLabel') || get(this, 'fulfilledLabel') || get(this, 'rejectedLabel'));
  }),

  /**
  * Label to be displayed during Promise pending state
  *
  * @field pendingLabel
  * @type string
  * @default undefined
  * @public
  */
  pendingLabel: undefined,

  /**
  * Label to be displayed during Promise fulfilled state, a.k.a success label
  *
  * @field successLabel
  * @type string
  * @default undefined
  * @public
  */
  fulfilledLabel: undefined,

  /**
  * Label to be displayed during Promise rejected state, a.k.a failure label
  *
  * @field failureLabel
  * @type string
  * @default undefined
  * @public
  */
  rejectedLabel: undefined,

  /**
  * Optional aria-label attribute
  *
  * @field ariaLabel
  * @type string
  * @default null
  * @public
  */
  ariaLabel: null,

  /**
  * _sizeClass
  *
  * @computed _sizeClass
  * @private
  */
  _sizeClass: computed('size', function () {
    let size = get(this, 'size');
    return size ? `btn--${size}` : null;
  }),

  /**
  * _typeClass
  *
  * @computed _typeClass
  * @private
  */
  _typeClass: computed('type', function () {
    let type = get(this, 'type');
    return type ? `btn--${get(this, 'type')}` : 'btn--primary';
  }),

  /**
  * `onClick` action handler
  *
  * @field onClick
  * @type function
  * @public
  */
  onClick: null,

  /**
  * _buttonText
  *
  * @computed _buttonText
  * @private
  */
  _buttonText: computed('_buttonState', 'label', function () {
    let state = get(this, '_buttonState');
    return state === 'default' 
    ? get(this, 'label') 
    : getWithDefault(this, `${state}Label`, get(this, 'label'));
  }),

  /**
  * _label
  *
  * @field _label
  * @type function
  * @private
  */
  _label: computed('_buttonText', 'ariaLabel', 'icon', function() {
    return get(this, 'ariaLabel') || get(this, '_buttonText') || get(this, 'icon');
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

    if (!get(this, '_isPending')) {
      let promise = action(get(this, 'value'));

      if (promise && typeof promise.then === 'function' && !get(this, 'isDestroyed')) {
        set(this, '_buttonState', BUTTON_STATE.PENDING);
        promise.then(() => {
          if (!get(this, 'isDestroyed')) {
            set(this, '_buttonState', BUTTON_STATE.FULFILLED);
          }
        }, () => {
          if (!get(this, 'isDestroyed')) {
            set(this, '_buttonState', BUTTON_STATE.REJECTED);
          }
        })
        .finally(() => {
          run.later(() => {
            set(this, '_buttonState', BUTTON_STATE.DEFAULT)
          }, get(this, 'labelTimeout'));
        });
      }
    }
    return false;
  },
});