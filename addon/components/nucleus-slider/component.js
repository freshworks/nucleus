import Component from '@ember/component';
import layout from './template';
import { next, later } from '@ember/runloop';
import { get, set } from '@ember/object';

export default Component.extend({
  classNames: ['nucleus-slider'],
  layout,

  startSlideOut: false,

  init() {
    this._super(...arguments);

    next(this, this._setupModal);
  },

  willDestroyElement() {
    set(this, 'startSlideOut', true);

    document.body.style.overflow = get(this, 'documentOverflowState');

    this._super(...arguments);
  },

  onClose() {
    set(this, 'startSlideOut', true);

    later(this, () => {
      this.onCloseModal && this.onCloseModal();
    }, 100);
  },

  _setupModal() {
    set(this, 'documentOverflowState', document.body.style.overflow);

    document.body.style.overflow = 'hidden';
  }
});
