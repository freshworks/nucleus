import Component from '@ember/component';
import { computed, get } from '@ember/object';
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

  /**
  * closeTitle
  *
  * @field closeTitle
  * @type null
  * @public
  */
  closeTitle: null,

  /**
  * hasCloseButton
  *
  * @field hasCloseButton
  * @type function
  * @public
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
  * @public
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
  * _buttonType
  *
  * @computed _buttonType
  */
  _buttonType: computed('type', function () {
    return get(this, 'type') ? `btn--${get(this, 'type')}` : 'btn--primary';
  }),
  actions: {
    /**
    * onSubmit
    *
    * @method onSubmit
    * @public
    *
    */
    onSubmit() {
      this.onSubmit();
    },

    /**
    * onClose
    *
    * @method onClose
    * @public
    *
    */
    onClose() {
      this.onClose();
    }

  }
});