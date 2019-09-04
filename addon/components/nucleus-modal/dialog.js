import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { isBlank } from '@ember/utils';
import layout from '../../templates/components/nucleus-modal/dialog';

/**
  Dialog Usage:
  @class Dialog
  @namespace Components
  @extends Ember.Component
  @public
*/
export default Component.extend({
  layout,
  classNames: ['nucleus-modal'],
  attributeBindings: ['tabindex'],

  /**
  * ariaRole
  *
  * @field ariaRole
  * @type string
  * @private
  */
  ariaRole: 'dialog',

  /**
  * tabindex
  *
  * @field tabindex
  * @type string
  * @private
  */
  tabindex: '-1',

  /**
  * keyboard
  *
  * @field keyboard
  * @type boolean
  * @public
  */
  keyboard: true,

  /**
  * size
  *
  * @field size
  * @type null
  * @public
  */
  size: null,

  /**
  * sizeClass
  *
  * @field sizeClass
  * @type function
  * @private
  */
  sizeClass: computed('size', function () {
    let size = get(this, 'size');
    return isBlank(size) ? null : `nucleus-modal__dialog--${size}`;
  }).readOnly(),

  /**
  * keyDown
  *
  * @method keyDown
  * @private
  * @param {any} e
  */
  keyDown(e) {
    let code = e.keyCode || e.which;

    if (code === 27 && get(this, 'keyboard')) {
      this.onClose();
    }
  }

});