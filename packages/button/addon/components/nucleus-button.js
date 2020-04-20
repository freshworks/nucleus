import {
  classNames,
  attributeBindings,
  classNameBindings,
  tagName,
  layout as templateLayout,
} from '@ember-decorators/component';
import defaultProp from '@freshworks/core/utils/default-decorator';

import { or, equal } from '@ember/object/computed';
import { run } from '@ember/runloop';
import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from "../templates/components/nucleus-button";
import { BUTTON_STATE, ICON_VARIANT_MAP } from "../constants/nucleus-button";
import safeSet from "../utils/safe-set";

/**
  __Usage:__

  [Refer component page](/docs/components/nucleus-button)

  @class Nucleus Button
  @namespace Components
  @extends Ember.Component
  @public
*/
@templateLayout(layout)
@tagName('button')
@classNames('nucleus-button')
@classNameBindings(
  'active',
  'block:nucleus-button--block',
  '_sizeClass',
  '_typeClass',
  'customClass',
  '_iconClass',
  'active:is-active'
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
  @defaultProp
  label = null;

  /**
  * Button sizes: `default` & `mini`
  *
  * @field size
  * @type string
  * @default null
  * @public
  */
  @defaultProp
  size = null;

  /**
  * Icon sizes: `mini`, `small`, `medium`, `large`
  *
  * @field iconSize
  * @type string
  * @default null
  * @public
  */
  @defaultProp
  iconSize = null;

  /**
  * _iconSize
  *
  * @computed _iconSize
  * @private
  */
  @computed('iconSize', 'size')
  get _iconSize() {
    let iconSize = this.get('iconSize');
    let defaultSize = this.get('size') ? this.get('size') : 'small';
    return iconSize ? iconSize : defaultSize;
  }

  /**
  * Button display variants: `primary`, `secondary`, `danger`, `text` & `link`
  *
  * @field variant
  * @type string
  * @default 'primary'
  * @public
  */
  @defaultProp
  variant = 'primary';

  /**
  * Attribute bound to icon variant
  *
  * @field _iconVariant
  * @type string
  * @private
  */
  @computed('variant')
  get _iconVariant() {
    let variant = this.get('variant');
    return ICON_VARIANT_MAP[variant];
  }

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
  @defaultProp
  active = false;

  /**
  * Flag to set autofocus
  *
  * @field autofocus
  * @type boolean
  * @default false
  * @public
  */
  @defaultProp
  autofocus = false;

  /**
  * Flag to set button as full width block.
  *
  * @field block
  * @type boolean
  * @default false
  * @public
  */
  @defaultProp
  block = false;

  /**
  * Icon name used in svg-jar.
  *
  * @field icon
  * @type string|null
  * @public
  */
  @defaultProp
  icon = null;

  /**
  * Specifies it is an icon-only button
  *
  * @field iconOnly
  * @type boolean
  * @public
  */
 @defaultProp
 iconOnly = false;

  /**
  * Custom class names to be added to the button.
  *
  * @field customClass
  * @type string
  * @public
  */
  @defaultProp
  customClass = null;

  /**
  * Flag to set disabled attribute
  *
  * @field disabled
  * @type boolean
  * @default false
  * @public
  */
  @defaultProp
  disabled = false;

  /**
  * _disabled
  *
  * @computed _disabled
  * @private
  */
  @computed('disabled', '_isPending')
  get _disabled() {
    let isDisabled = this.get('disabled');
    return isDisabled ? isDisabled : this.get('_isPending');
  }

  /**
  * Function Arguments for `onClick` action
  *
  * @field args
  * @type string|number|object
  * @public
  */
  @defaultProp
  args = null;

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
  _buttonState = BUTTON_STATE.DEFAULT;

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
    return !(this.get('pendingLabel') || this.get('fulfilledLabel') || this.get('rejectedLabel'));
  }

  /**
  * Label to be displayed during Promise pending state
  *
  * @field pendingLabel
  * @type string
  * @default undefined
  * @public
  */
  @defaultProp
  pendingLabel = '';

  /**
  * Label to be displayed during Promise fulfilled state, a.k.a success label
  *
  * @field successLabel
  * @type string
  * @default undefined
  * @public
  */
  @defaultProp
  fulfilledLabel = '';

  /**
  * Label to be displayed during Promise rejected state, a.k.a failure label
  *
  * @field failureLabel
  * @type string
  * @default undefined
  * @public
  */
  @defaultProp
  rejectedLabel = '';

  /**
  * Optional aria-label attribute
  *
  * @field ariaLabel
  * @type string
  * @default null
  * @public
  */
  @defaultProp
  ariaLabel = null;

  /**
  * _sizeClass
  *
  * @computed _sizeClass
  * @private
  */
  @computed('size')
  get _sizeClass() {
    let size = this.get('size');
    return size ? `nucleus-button--${size}` : null;
  }

  /**
  * _typeClass
  *
  * @computed _typeClass
  * @private
  */
  @computed('variant')
  get _typeClass() {
    let type = this.get('variant');
    return type ? `nucleus-button--${type}` : 'nucleus-button--primary';
  }

  /**
  * _iconClass
  *
  * @computed _iconClass
  * @private
  */
  @computed('iconOnly')
  get _iconClass() {
    let iconButton = this.get('iconOnly');
    return iconButton ? `nucleus-button--iconOnly` : null;
  }

  /**
  * `onClick` action handler
  *
  * @field onClick
  * @type function
  * @public
  */
  @defaultProp
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
    ? this.get('label')
    : this.get(`${state}Label`);
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
    return this.get('ariaLabel') || this.get('_buttonText') || this.get('icon');
  }

  /**
  * click
  *
  * @method click
  * @public
  *
  */
  click() {
    let action = this.get('onClick');
    if(this.active)
    {
    this.set('active',false)
    }
    else{
    this.set('active',true)
    }
    
  
    if (action === null || action === undefined) {
      return;
    }

    if (!this.get('_isPending')) {
      let promise = (action)(this.get('args'));

      if (promise && typeof promise.then === 'function') {
        safeSet(this, '_buttonState', BUTTON_STATE.PENDING);
        promise.then(() => {
          safeSet(this, '_buttonState', BUTTON_STATE.FULFILLED);
        }, () => {
          safeSet(this, '_buttonState', BUTTON_STATE.REJECTED);
        })
        .finally(() => {
          run.later(() => {
            safeSet(this, '_buttonState', BUTTON_STATE.DEFAULT)
          }, this.labelTimeout);
        });
      }
    }
    return false;
  }
}

export default NucleusButton;
