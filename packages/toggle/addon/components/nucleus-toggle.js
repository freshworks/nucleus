import {
  classNames,
  attributeBindings,
  classNameBindings,
  tagName,
  layout as templateLayout,
} from '@ember-decorators/component';

import defaultProp from '@freshworks/core/utils/default-decorator';

import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { alias } from '@ember/object/computed';
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
@tagName('div')
@classNames('nucleus-toggle')
@classNameBindings('_sizeClass')
@attributeBindings('disabled', 'isChecked:checked', 'isChecked:aria-checked')

class NucleusToggle extends Component {
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
  * Attribute name `isChecked` is used to set aria-checked state
  *
  * @field isChecked
  * @type boolean
  * @default false
  * @public
  */
  @defaultProp
  value = false;
  @alias('value') isChecked;

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
    this.set('isChecked', value);
    if (this.get('onClick')) {
      return this.get('onClick')();
    } 
  }
}

export default NucleusToggle;