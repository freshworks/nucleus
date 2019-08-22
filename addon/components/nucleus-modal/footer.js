import Component from '@ember/component';
import { computed, get } from '@ember/object';
import layout from '../../templates/components/nucleus-modal/footer';


export default Component.extend({
  layout,
  tagName: 'form',
  classNames: ['nucleus-modal__footer'],

  closeTitle: null,

  hasCloseButton: computed.notEmpty('closeTitle'),

  submitTitle: null,

  hasSubmitButton: computed.notEmpty('submitTitle'),

  submitDisabled: false,

  type: 'primary',

  _buttonType: computed('type', function() {
      return get(this, 'type') ? `btn--${get(this, 'type')}` : 'btn--primary';
    }),

  actions: {

    onSubmit() {
      this.onSubmit();
    },

    onClose() {
      this.onClose();
    }
  }

});