import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { isBlank } from '@ember/utils';
import layout from '../../templates/components/nucleus-modal/dialog';


export default Component.extend({
  layout,
  classNames: ['nucleus-modal'],
  attributeBindings: ['tabindex'],
  ariaRole: 'dialog',
  tabindex: '-1',

  keyboard: true,

  size: null,

  backdropClose: true,

  sizeClass: computed('size', function() {
    let size = get(this, 'size');
    return isBlank(size) ? null : `nucleus-modal__dialog--${size}`;
  }).readOnly(),

  keyDown(e) {
    let code = e.keyCode || e.which;
    if (code === 27 && get(this, 'keyboard')) {
      this.onClose();
    }
  }

}); 