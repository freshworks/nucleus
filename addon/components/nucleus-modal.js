import Component from "@ember/component";
import { set, get, getProperties, computed, observer } from "@ember/object";
import { run } from "@ember/runloop";
import layout from "../templates/components/nucleus-modal";

/**
  NucleusModal Usage:
  @class NucleusModal
  @namespace Components
  @extends Ember.Component
  @public
*/
export default Component.extend({
  layout,

  /**
  * Open the modal
  *
  * @field open
  * @type boolean
  * @default false
  * @readonly
  * @public
  */
  open: false,

  /**
  * isOpen
  *
  * @field isOpen
  * @type function
  * @private
  */
  isOpen: computed.reads("open"),

  /**
  * backdrop
  *
  * @field backdrop
  * @type boolean
  * @public
  */
  backdrop: true,

  /**
  * _showBackdrop
  *
  * @field _showBackdrop
  * @type boolean
  * @private
  */
  _showBackdrop: computed.reads("backdrop"),

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
  * renderInPlace
  *
  * @field renderInPlace
  * @type boolean
  * @public
  */
  renderInPlace: false,

  /**
  * isInDOM
  *
  * @field renderInPlace
  * @type boolean
  * @private
  */
 isInDOM: computed.reads("isOpen"),

  /**
  * modalId
  *
  * @field modalId
  * @type string
  * @private
  */
  modalId: computed('elementId', function() {
    return `nucleus-modal-${this.get('elementId')}`;
  }),

  /**
  * modalElement
  *
  * @field modalElement
  * @type function
  * @private
  */
  modalElement: computed("modalId", function () {
    return document.getElementById(get(this, "modalId"));
  }).volatile(),

  /**
  * backdropId
  *
  * @field backdropId
  * @type string
  * @private
  */
 backdropId: computed('elementId', function() {
  return `nucleus-modal-backdrop-${this.get('elementId')}`;
}),

  /**
  * backdropElement
  *
  * @field backdropElement
  * @type function
  * @private
  */
  backdropElement: computed("backdropId", function () {
    return document.getElementById(get(this, "backdropId"));
  }).volatile(),
  actions: {
    /**
    * close
    *
    * @method close
    * @public
    *
    */
    close() {
      if (get(this, 'onClose')() !== false) {
        this._hide();
      }
    },

    /**
    * submit
    *
    * @method submit
    * @public
    *
    */
    submit() {
      if (get(this, "onSubmit")) {
        this.onSubmit();
      }
    }

  },

  /**
  * takeFocus
  *
  * @method takeFocus
  * @private
  *
  */
  _takeFocus() {
    let modalEl = get(this, "modalElement");
    let focusElement = modalEl && modalEl.querySelector("[autofocus]");

    if (!focusElement) {
      focusElement = modalEl;
    }

    if (focusElement) {
      focusElement.focus();
    }
  },

  /**
  * show
  *
  * @method show
  * @private
  *
  */
  _show() {
    document.body.classList.add("nucleus-modal--open");

    let modalEl = get(this, "modalElement");
    if (modalEl) {
      modalEl.style.display = "block";
      modalEl.scrollTop = 0;
    } 

    let callback = function () {
      let backdropEl = get(this, "backdropElement");
      if (backdropEl) {
        backdropEl.style.display = "block";
      }
    };

    this.handleBackdrop(callback);
  },

  /**
  * hide
  *
  * @method hide
  * @public
  *
  */
  _hide() {
    let modalEl = get(this, "modalElement");
    if(modalEl) {
      modalEl.style.display = "none";
    }
    
    this.handleBackdrop(() => {
      let backdropEl = get(this, "backdropElement");
      if(backdropEl) {
        backdropEl.style.display = "none";
      }
      document.body.classList.remove("nucleus-modal--open");
    });
  },

  /**
  * handleBackdrop
  *
  * @method handleBackdrop
  * @public
  * @param {any} callback
  */
  handleBackdrop(callback) {
    if (get(this, "isOpen") && get(this, "backdrop")) {
      set(this, "_showBackdrop", true);

      if (!callback) {
        return;
      }

      callback.call(this);
    } else if (!get(this, "isOpen") && get(this, "backdrop")) {
      let callbackRemove = function () {
        set(this, "_showBackdrop", false);

        if (callback) {
          callback.call(this);
        }
      };

      callbackRemove.call(this);
    } else if (callback) {
      run.next(this, callback);
    }
  },

  /**
  * attachEventHandlers
  *
  * @method attachEventHandlers
  * @public
  *
  */
  attachEventHandlers() {
    window.addEventListener("focusin", event => this.loopFocus(event));
  },

  /**
  * removeEventHandlers
  *
  * @method removeEventHandlers
  * @public
  *
  */
  removeEventHandlers() {
    window.removeEventListener("focusin", this.loopFocus(event), false);
  },

  /**
  * loopFocus
  *
  * @method loopFocus
  * @public
  * @param {any} event
  */
  loopFocus(event) {
    let modalEl = get(this, "modalElement");

    if (document !== event.target && modalEl && modalEl !== event.target && !modalEl.contains(event.target)) {
      this._takeFocus();
    }
  },

  _observeOpen: observer('isOpen', function() {
    if (this.get('isOpen')) {
      this._show();
    } else {
      this._hide();
    }
  }),

  init() {
    this._super(...arguments);
    this.attachEventHandlers();
  },

  didRender() {
    this._super(...arguments);
    run.next(() => {
      this._takeFocus();
    });
  },

  willDestroyElement() {
    this._super(...arguments);
    this.removeEventHandlers();
    this._hide();
  }

});