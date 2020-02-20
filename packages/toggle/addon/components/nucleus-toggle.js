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
@classNameBindings(
  '_sizeClass'
)
@attributeBindings('_disabled:disabled')
class NucleusToggle extends Component {
  @computed('size')
  get _sizeClass() {
    let size = this.get('size');
    return size ? `nucleus-toggle--${size}` : 'nucleus-toggle--medium';
  }
  
  @defaultProp
  value = true;
  @alias('value') checkedValue;

  @action
  onValueChange(value) {
    this.set('checkedValue', value);
  }
}

export default NucleusToggle;

