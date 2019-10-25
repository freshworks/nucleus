import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../../templates/components/nucleus-modal/footer';

/**
  Footer Usage:
  @class Footer
  @namespace Components
  @extends Ember.Component
  @public
*/
export default Component.extend({
  layout,
  tagName: 'form',
  classNames: ['nucleus-modal__footer'],
  classNameBindings: ['isSticky:sticky'],

  /**
  * closeTitle
  *
  * @field closeTitle
  * @type null
  * @public
  */
  closeTitle: null,

  /**
  * isSticky
  *
  * @field isSticky
  * @type boolean
  * @public
  */
 isSticky: true,

  /**
  * hasCloseButton
  *
  * @field hasCloseButton
  * @type function
  * @private
  */
  hasCloseButton: computed.notEmpty('closeTitle'),

  /**
  * submitTitle
  *
  * @field submitTitle
  * @type null
  * @public
  */
  submitTitle: null,

  /**
  * hasSubmitButton
  *
  * @field hasSubmitButton
  * @type function
  * @private
  */
  hasSubmitButton: computed.notEmpty('submitTitle'),

  /**
  * submitDisabled
  *
  * @field submitDisabled
  * @type boolean
  * @public
  */
  submitDisabled: false,

  /**
  * type
  *
  * @field type
  * @type string
  * @public
  */
  type: 'primary',

  /**
   * The action to send to the parent modal component when the modal footer's form is submitted
   *
   * @event onSubmit
   * @public
   */
  onSubmit() {},

  /**
   * @event onClose
   * @public
   */
  onClose() {}
});