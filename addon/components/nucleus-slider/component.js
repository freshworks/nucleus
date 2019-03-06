import Component from '@ember/component';
import layout from './template';
import { next, later } from '@ember/runloop';
import { set } from '@ember/object';

export default Component.extend({
  classNames: ['nucleus-slider'],
  layout,

  slideInDone: false,
  startSlideOut: false,

  onClose() {
    set(this, 'startSlideOut', true);

    later(this, () => {
      this.onCloseModal && this.onCloseModal();
    }, 100);
  },

  init() {
    this._super(...arguments);

    next(this, this._setupModal);
  },

  willDestroyElement() {
    set(this, 'startSlideOut', true);

    document.body.classList.remove('overlay-enabled');

    this._super(...arguments);
  },

  _setupModal() {
    document.body.classList.add('overlay-enabled');

    set(this, 'slideInDone', true);
  }
});
