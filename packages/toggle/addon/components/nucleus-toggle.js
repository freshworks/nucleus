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
@attributeBindings('disabled:disabled', 'checkedValue:checked')

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
  * Attribute name `checked` is added when set to true
  *
  * @field checkedValue
  * @type boolean
  * @default false
  * @public
  */
  @defaultProp
  value = false;
  @alias('value') checkedValue;

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
  * Flag to set disabled attribute
  *
  * @field disabled
  * @type boolean
  * @default false
  * @public
  */
  @defaultProp
  disabled = false;

  @action
  onValueChange(value) {
    this.set('checkedValue', value);
  }
}

export default NucleusToggle;