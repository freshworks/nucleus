import {
    classNames,
    tagName,
    layout as templateLayout,
  } from '@ember-decorators/component';
  import Component from '@ember/component';
  import layout from "../templates/components/nucleus-button-group";
  import defaultProp from '@freshworks/core/utils/default-decorator';

  /**
    __Usage:__
  
    [Refer component page](/docs/components/nucleus-button)
  
    @class Nucleus Button Group
    @namespace Components
    @extends Ember.Component
    @public
  */
  @templateLayout(layout)
  @tagName('div')
  @classNames('nucleus-button-group')

  class NucleusButtonGroup extends Component {
  /**
  * data-test-id
  *
  * @field data-test-id
  * @type string
  * @private
  */
 'data-test-id' = 'nucleus-button-group';
  
  /**
  * Flag to set toggle attribute
  *
  * @field type
  * @type string
  * @public
  * @default `info`
  */
 @defaultProp
 type = null;

  }export default NucleusButtonGroup;