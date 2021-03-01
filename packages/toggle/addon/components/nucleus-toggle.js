import {
  classNames,
  attributeBindings,
  classNameBindings,
  layout as templateLayout,
} from '@ember-decorators/component';

import defaultProp from '@freshworks/core/utils/default-decorator';

import Component from '@ember/component';
import { action, computed } from '@ember/object';

import { bool } from '@ember/object/computed';

import layout from "../templates/components/nucleus-toggle";

/**
  __Usage:__
  [Refer component page](/docs/components/nucleus-toggle)
  @class Nucleus Toggle
  @namespace Components
  @extends Ember.Component 
  @public
*/
@templateLayout(layout)
@classNames('nucleus-toggle')
@classNameBindings('_sizeClass', 'isChecked:nucleus-toggle--checked')
@attributeBindings('data-test-id', 'disabled', 'isChecked:aria-checked', 'ariaLabel:aria-label')

class NucleusToggle extends Component {
  /**
  * data-test-id
  *
  * @field data-test-id
  * @type string
  * @private
  */
  'data-test-id' = 'nucleus-toggle';

  /**
  * Class name is added based on _sizeClass
  *
  * @computed _sizeClass
  * @type string
  * @private
  */
  @computed('size')
  get _sizeClass() {
    let size = this.get('size');
    return size ? `nucleus-toggle--${size}` : 'nucleus-toggle--medium';
  }

  /**
  * Attribute name `isChecked` is used to set aria-checked value
  *
  * @field isChecked
  * @type boolean
  * @default false
  * @public
  */
  @bool('value')
  isChecked;

  /**
  * Attribute name `value` is used to determine the toggle state
  *
  * @field value
  * @type boolean
  * @default false
  * @public
  */
  @defaultProp
  value = false;

  /**
  * toggle sizes: `large` , `medium` & `small`
  *
  * @field size
  * @type string
  * @default null
  * @public
  */
  @defaultProp
  size = 'medium';

  /**
  * Attribute name `ariaLabel` used to set aria-label value
  *
  * @field ariaLabel
  * @type string|null
  * @default null
  * @public
  */
  @defaultProp
  ariaLabel = null;

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
  * `onClick` action handler
  *
  * @field onClick
  * @type function
  * @public
  */
  @defaultProp
  onClick = null;

  @action
  onValueChange(value) {
    this.set('value', value);
    if (this.get('onClick')) {
      return this.get('onClick')(value);
    }
  }
}

export default NucleusToggle;