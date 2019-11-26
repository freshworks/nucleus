import classic from 'ember-classic-decorator';
import {
  classNames,
  attributeBindings,
  classNameBindings,
  tagName,
  layout as templateLayout,
} from '@ember-decorators/component';

import { or, equal } from '@ember/object/computed';
import { run } from '@ember/runloop';
import Component from '@ember/component';
import { set, getWithDefault, computed } from '@ember/object';
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
export default
@classic
@templateLayout(layout)
@tagName('button')
@classNames('nucleus-button')
@classNameBindings(
  'active',
  'block:nucleus-button--block',
  '_sizeClass',
  '_typeClass',
  'customClass'
)
@attributeBindings('_disabled:disabled', '_buttonType:type', '_label:aria-label', 'autofocus')
class NucleusButton extends Component {
  /**
  * Default button text
  *
  * @field label
  * @type string|null
  * @default null
  * @public
  */
  label = null;

  /**
  * Button sizes: `default` & `mini`
  *
  * @field size
  * @type string
  * @default null
  * @public
  */
  size = null;

  /**
  * Button display types: `primary`, `secondary`, `danger`, `text` & `link`
  *
  * @field type
  * @type string
  * @default 'primary'
  * @public
  */
  type = 'primary';

  /**
  * Attribute bound to button type
  *
  * @field _buttonType
  * @type string
  * @private
  */
  _buttonType = 'button';

  /**
  * Class name `active` added if set to true
  *
  * @field active
  * @type boolean
  * @default false
  * @public
  */
  active = false;

  /**
  * Flag to set autofocus
  *
  * @field autofocus
  * @type boolean
  * @default false
  * @public
  */
  autofocus = false;

  /**
  * Flag to set button as full width block.
  *
  * @field block
  * @type boolean
  * @default false
  * @public
  */
  block = false;

  /**
  * Icon name used in svg-jar.
  *
  * @field icon
  * @type string|null
  * @public
  */
  icon = null;

  /**
  * Custom class names to be added to the button.
  *
  * @field customClass
  * @type string
  * @public
  */
  customClass = null;

  /**
  * Flag to set disabled attribute
  *
  * @field disabled
  * @type boolean
  * @default false
  * @public
  */
  disabled = false;

  /**
  * _disabled
  *
  * @computed _disabled
  * @private
  */
  @computed('disabled', '_isPending')
  get _disabled() {
    let isDisabled = this.disabled;
    return isDisabled ? isDisabled : this._isPending;
  }

  /**
  * Value to be passed as argument for `onClick` action
  *
  * @field value
  * @type string|number|object
  * @public
  */
  value = null;

  /**
  * Timeout after which the default label replaces fulfilled/rejected label.
  *
  * @field labelTimeout
  * @type number
  * @default 100
  * @public
  */
  labelTimeout = 1000;

  /**
  * Internal button _buttonState management utility
  *
  * @field _buttonState
  * @type string
  * @private
  */
  #buttonState = BUTTON_STATE.DEFAULT;

  /**
  * _isPending
  *
  * @field _isPending
  * @type boolean
  * @private
  */
  @equal('_buttonState', BUTTON_STATE.PENDING)
  _isPending;

  /**
  * _isFulfilled
  *
  * @field _isFulfilled
  * @type boolean
  * @private
  */
  @equal('_buttonState', BUTTON_STATE.FULFILLED)
  _isFulfilled;

  /**
  * _isRejected
  *
  * @field _isRejected
  * @type boolean
  * @private
  */
  @equal('_buttonState', BUTTON_STATE.REJECTED)
  _isRejected;

  /**
  * _isLoading
  *
  * @field _isLoading
  * @type boolean
  * @private
  */
  @or('_isPending', '_isFulfilled', '_isRejected')
  _isLoading;

  /**
  * To display animated checkmark
  *
  * @field _isLoadingComplete
  * @type boolean
  * @private
  */
  @or('_isFulfilled', '_isRejected')
  _isLoadingComplete;

  /**
  * Show loading animation only if custom state labels are not specified
  *
  * @field _isShowLoading
  * @type boolean
  * @private
  */
  @computed('_isLoading', 'pendingLabel', 'fulfilledLabel', 'rejectedLabel')
  get _isShowLoading() {
    return !(this.pendingLabel || this.fulfilledLabel || this.rejectedLabel);
  }

  /**
  * Label to be displayed during Promise pending state
  *
  * @field pendingLabel
  * @type string
  * @default undefined
  * @public
  */
  pendingLabel = undefined;

  /**
  * Label to be displayed during Promise fulfilled state, a.k.a success label
  *
  * @field successLabel
  * @type string
  * @default undefined
  * @public
  */
  fulfilledLabel = undefined;

  /**
  * Label to be displayed during Promise rejected state, a.k.a failure label
  *
  * @field failureLabel
  * @type string
  * @default undefined
  * @public
  */
  rejectedLabel = undefined;

  /**
  * Optional aria-label attribute
  *
  * @field ariaLabel
  * @type string
  * @default null
  * @public
  */
  ariaLabel = null;

  /**
  * _sizeClass
  *
  * @computed _sizeClass
  * @private
  */
  @computed('size')
  get _sizeClass() {
    let size = this.size;
    return size ? `nucleus-button--${size}` : null;
  }

  /**
  * _typeClass
  *
  * @computed _typeClass
  * @private
  */
  @computed('type')
  get _typeClass() {
    let type = this.type;
    return type ? `nucleus-button--${this.type}` : 'nucleus-button--primary';
  }

  /**
  * `onClick` action handler
  *
  * @field onClick
  * @type function
  * @public
  */
  onClick = null;

  /**
  * _buttonText
  *
  * @computed _buttonText
  * @private
  */
  @computed('_buttonState', 'label')
  get _buttonText() {
    let state = this._buttonState;
    return state === 'default' 
    ? this.label 
    : getWithDefault(this, `${state}Label`, this.label);
  }

  /**
  * _label
  *
  * @field _label
  * @type function
  * @private
  */
  @computed('_buttonText', 'ariaLabel', 'icon')
  get _label() {
    return this.ariaLabel || this._buttonText || this.icon;
  }

  /**
  * click
  *
  * @method click
  * @public
  *
  */
  click() {
    let action = this.onClick;

    if (action === null || action === undefined) {
      return;
    }

    if (!this._isPending) {
      let promise = action(this.value);

      if (promise && typeof promise.then === 'function' && !this.isDestroyed) {
        set(this, '_buttonState', BUTTON_STATE.PENDING);
        promise.then(() => {
          if (!this.isDestroyed) {
            set(this, '_buttonState', BUTTON_STATE.FULFILLED);
          }
        }, () => {
          if (!this.isDestroyed) {
            set(this, '_buttonState', BUTTON_STATE.REJECTED);
          }
        })
        .finally(() => {
          run.later(() => {
            set(this, '_buttonState', BUTTON_STATE.DEFAULT)
          }, this.labelTimeout);
        });
      }
    }
    return false;
  }
}