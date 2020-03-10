import { classNames, attributeBindings, classNameBindings, layout as templateLayout } from '@ember-decorators/component';
import defaultProp from '@freshworks/core/utils/default-decorator';
import { readOnly } from '@ember/object/computed';
import Component from '@ember/component';
import { set, computed } from '@ember/object';
import { isBlank } from '@ember/utils';
import layout from '../../templates/components/nucleus-modal/dialog';
import EventHandler from "../../utils/event-handler";

/**
  Dialog Usage:
  @class Dialog
  @namespace Components
  @extends Ember.Component
  @public
*/
@templateLayout(layout)
@classNames('nucleus-modal')
@classNameBindings('positionClass')
@attributeBindings('tabindex', 'ariaLabelledby:aria-labelledby', 'ariaModal:aria-modal')
class Dialog extends Component {
  ariaRole = 'dialog';

  @readOnly('titleId')
  ariaLabelledby;

  ariaModal = true;

  /**
  * tabindex
  *
  * @field tabindex
  * @type string
  * @private
  */
  tabindex = '-1';

  /**
  * animation class
  *
  * @field animationClass
  * @type string
  * @private
  */
  @defaultProp
  animationClass = 'slide-down';

  /**
  * keyboard
  *
  * @field keyboard
  * @type boolean
  * @public
  */
  @defaultProp
  keyboard = true;

  /**
  * size
  *
  * @field size
  * @type null
  * @public
  */
  @defaultProp
  size = null;

  /**
  * sizeClass
  *
  * @field sizeClass
  * @type function
  * @private
  */
  @computed('size', function() {
    let size = this.get('size');
    return isBlank(size) ? null : `nucleus-modal__dialog--${size}`;
  })
  sizeClass;

  /**
  * Modal position: `center`, `left` & `right`
  *
  * @property position
  * @type string
  * @default center
  * @public
  */
  @defaultProp
  position = 'center';

  /**
   * positionClass
   *
   * @field positionClass
   * @type function
   * @private
   */
  @computed('position', function() {
    let position = this.get('position');
    return isBlank(position) ? null : `nucleus-modal--${position}`;
  })
  positionClass;

  /**
   * The id of the `.modal-title` element
   *
   * @field titleId
   * @type string
   * @default null
   * @private
   */
  @defaultProp
  titleId = null;

  /**
   * Gets or sets the id of the title element for aria accessibility tags
   *
   * @method getSetTitleID
   * @private
   */
  getOrSetTitleId() {
    const modalNode = this.get('element');
    let nodeId = null;

    if (modalNode) {
      const titleNode = modalNode.querySelector('.nucleus-modal__header .title');
      if (titleNode) {
        nodeId = titleNode.id
        if (!nodeId) {
          nodeId = `${this.get('id')}-title`;
          titleNode.id = nodeId;
        }
      }
    }
    set(this, 'titleId', nodeId);
  }

  /**
  * keyDown
  *
  * @method keyDown
  * @private
  * @param {any} e
  */
  keyDown(e) {
    let code = e.keyCode || e.which;

    if (code === 27 && this.get('keyboard')) {
      this.onClose();
    }
  }

  /**
  * attachEventHandlers for scrolls
  *
  * @method attachEventHandlers
  * @private
  *
  */
  attachEventHandlers() {
    let _scrollCallback = EventHandler.bindEvent({
      eventName: 'scroll',
      callback: this.scrolled.bind(this), 
      element: '.nucleus-modal__body'
    });
    let _focusListener = EventHandler.bindEvent({
      eventName: 'keydown',
      callback: this.loopFocus.bind(this)
    });
    this.setProperties({
      '_scrollCallback': _scrollCallback,
      '_focusListener': _focusListener
    });
    this._createFocus();
  }

  scrolled() {
    const modalNode = this.get('element');
    if(modalNode) {
      const titleNode = modalNode.querySelector('.nucleus-modal__header');
      const contentNode = modalNode.querySelector('.nucleus-modal__body');
      if (titleNode && contentNode && contentNode.scrollTop > titleNode.offsetHeight) {
        titleNode.classList.add('sticky');
      } else {
        titleNode.classList.remove('sticky');
      }
    }
  }

  /**
  * createFocus
  *
  * @method createFocus
  * @private
  *
  */
  _createFocus() {
    let modalDialog = this.element;
    let focusEl = modalDialog && modalDialog.querySelector("[autofocus]");
    if(focusEl) {
      focusEl.focus();
    }
    else {
      modalDialog.focus();
    }
  }

  /**
  * loopFocus
  *
  * @method loopFocus
  * @private
  * @param {any} event
  */
  loopFocus(event) {
    let isTab = (event.key === 'Tab' || event.keyCode === 9);
    if (!isTab) {
      return;
    }
    let modalDialog = this.element.querySelector(".nucleus-modal__dialog");
    let focusElements = [...modalDialog.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])')];    
    let currentIndex = focusElements.indexOf(document.activeElement);
    if (currentIndex === -1) {
      focusElements[0].focus();
    }
    if(event.shiftKey && currentIndex === 0) {
      event.preventDefault();
      focusElements[focusElements.length-1].focus();
    } 
    else if (currentIndex === (focusElements.length - 1)) {
      event.preventDefault();
      focusElements[0].focus();
    }
  }

  didInsertElement() {
    super.didInsertElement(...arguments);
    this.getOrSetTitleId();
    this.attachEventHandlers();
  }

  willDestroyElement() {
    super.willDestroyElement(...arguments);
    EventHandler.unbindEvent({
      eventName: 'scroll',
      callback: this._scrollCallback, 
      element: '.nucleus-modal__body'
    });
    EventHandler.unbindEvent({
      eventName: 'keydown',
      callback: this._focusListener
    });
  }
}

export default Dialog;
