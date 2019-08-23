import Component from "@ember/component";
import { set, get, getProperties, computed } from "@ember/object";
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
  * open
  *
  * @field open
  * @type boolean
  * @public
  */
  open: true,

  /**
  * isOpen
  *
  * @field isOpen
  * @type function
  * @private
  */
  isOpen: computed.reads("open"),

  /**
  * _isOpen
  *
  * @field _isOpen
  * @type boolean
  * @private
  */
  _isOpen: false,

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
  _showBackdrop: false,

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
  * modalId
  *
  * @field modalId
  * @type string
  * @private
  */
  modalId: "nucleus-modal-dialog",

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
  backdropId: "nucleus-modal-backdrop",

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
      this.set("isOpen", false);

      if (!get(this, "onClose")) {
        this._hide();
      } else {
        this.onClose();
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
    if (this._isOpen) {
      return;
    }

    this._isOpen = true;
    document.body.classList.add("nucleus-modal--open");

    let callback = function () {
      if (get(this, "isDestroyed")) {
        return;
      }

      let modalEl = get(this, "modalElement");

      if (modalEl) {
        modalEl.style.display = "block";
        modalEl.scrollTop = 0;
      } // this.get('onShow')();


      this._takeFocus();
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
    if (!this._isOpen) {
      return;
    }

    this._isOpen = false;
    get(this, "modalElement").style.display = "none";
    get(this, "backdropElement").style.display = "none";
    this.handleBackdrop(() => {
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

  init() {
    this._super(...arguments);

    let {
      isOpen,
      backdrop
    } = getProperties(this, "isOpen", "backdrop");
    set(this, "_showBackdrop", isOpen && backdrop);
  },

  didInsertElement() {
    this._super(...arguments);

    if (get(this, "isOpen")) {
      this._show();
      this.attachEventHandlers();
    }
  },

  willDestroyElement() {
    this._super(...arguments);

    this.removeEventHandlers();
    this._hide();
  }

});