import Component from '@ember/component';

export default Component.extend({
  classNames: ['nucleus-slider-close'],

  click() {
    this.onClose();
  }
});
