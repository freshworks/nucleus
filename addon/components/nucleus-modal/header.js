import Component from '@ember/component';
import layout from '../../templates/components/nucleus-modal/header';


export default Component.extend({
  layout,
  classNames: ['nucleus-modal__header'],

  closeButton: false,

  title: null,

  actions: {
    onClose() {
      this.onClose();
    }
  }

});