import Component from '@ember/component';

export default Component.extend({
  classNames: ['ui-slider-modal-close'],

  click() {
    this.onClose();
  }
});
