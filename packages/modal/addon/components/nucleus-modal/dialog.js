import Component from '@ember/component';
import { computed, get, set } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { isBlank } from '@ember/utils';
import layout from '../../templates/components/nucleus-modal/dialog';
import scroll from "../../mixins/scroll";

/**
  Dialog Usage:
  @class Dialog
  @namespace Components
  @extends Ember.Component
  @public
*/
export default Component.extend(scroll, {
  layout,
  classNames: ['nucleus-modal'],
  classNameBindings: ['positionClass'],
  attributeBindings: ['tabindex', 'aria-labelledby', 'aria-modal'],
  ariaRole: 'dialog',
  "aria-labelledby": readOnly('titleId'),
  "aria-modal": true,

  /**
  * tabindex
  *
  * @field tabindex
  * @type string
  * @private
  */
  tabindex: '-1',

  /**
  * animation class
  *
  * @field animationClass
  * @type string
  * @private
  */
 animationClass: 'slide-down',

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
  * Modal position: `center`, `left` & `right`
  *
  * @property position
  * @type string
  * @default center
  * @public
  */
  position: 'center',

  /**
   * positionClass
   *
   * @field positionClass
   * @type function
   * @private
   */
  positionClass: computed('position', function () {
    let position = get(this, 'position');
    return isBlank(position) ? null : `nucleus-modal--${position}`;
  }).readOnly(),

  /**
   * The id of the `.modal-title` element
   *
   * @field titleId
   * @type string
   * @default null
   * @private
   */
  titleId: null,

  /**
   * Gets or sets the id of the title element for aria accessibility tags
   *
   * @method getSetTitleID
   * @private
   */
  getOrSetTitleId() {
    const modalNode = get(this, 'element');
    let nodeId = null;

    if (modalNode) {
      const titleNode = modalNode.querySelector('.nucleus-modal__header .title');
      if (titleNode) {
        nodeId = titleNode.id
        if (!nodeId) {
          nodeId = `${get(this, 'id')}-title`;
          titleNode.id = nodeId;
        }
      }
    }
    set(this, 'titleId', nodeId);
  },

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
  },

  scrolled: function() {
    const modalNode = get(this, 'element');
    if(modalNode) {
      const titleNode = modalNode.querySelector('.nucleus-modal__header');
      const contentNode = modalNode.querySelector('.nucleus-modal__body');
      if (titleNode && contentNode && contentNode.scrollTop > titleNode.offsetHeight) {
        titleNode.classList.add('sticky');
      } else {
        titleNode.classList.remove('sticky');
      }
    }
  },

  didInsertElement() {
    this._super(...arguments);
    this.getOrSetTitleId();
    this.bindScrolling('.nucleus-modal__body');
  },

  willDestroyElement() {
    this._super(...arguments);
    this.unbindScrolling();
  }

});