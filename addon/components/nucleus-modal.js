import Component from "@ember/component";
import { set, get, getProperties, computed } from "@ember/object";
import { run } from "@ember/runloop";
import layout from "../templates/components/nucleus-modal";

export default Component.extend({
  layout,

  open: true,

  isOpen: computed.reads("open"),

  _isOpen: false,

  backdrop: true,

  _showBackdrop: false,

  keyboard: true,

  size: null,

  renderInPlace: false,

  modalId: "nucleus-modal-dialog",
  modalElement: computed("modalId", function() {
    return document.getElementById(get(this, "modalId"));
  }).volatile(),

  backdropId: "nucleus-modal-backdrop",
  backdropElement: computed("backdropId", function() {
    return document.getElementById(get(this, "backdropId"));
  }).volatile(),

  actions: {
    close() {
      this.set("isOpen", false);
      if (!get(this, "onClose")) {
        this.hide();
      } else {
        this.onClose();
      }
    },
    submit() {
      if (get(this, "onSubmit")) {
        this.onSubmit();
      }
    }
  },

  takeFocus() {
    let modalEl = get(this, "modalElement");
    let focusElement = modalEl && modalEl.querySelector("[autofocus]");
    if (!focusElement) {
      focusElement = modalEl;
    }
    if (focusElement) {
      focusElement.focus();
    }
  },

  show() {
    if (this._isOpen) {
      return;
    }
    this._isOpen = true;

    document.body.classList.add("nucleus-modal--open");

    let callback = function() {
      if (get(this, "isDestroyed")) {
        return;
      }

      let modalEl = get(this, "modalElement");

      if (modalEl) {
        modalEl.style.display = "block";
        modalEl.scrollTop = 0;
      }

      // this.get('onShow')();
      this.takeFocus();
    };
    this.handleBackdrop(callback);
  },

  hide() {
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

  handleBackdrop(callback) {
    if (get(this, "isOpen") && get(this, "backdrop")) {
      set(this, "_showBackdrop", true);

      if (!callback) {
        return;
      }
      callback.call(this);
    } else if (!get(this, "isOpen") && get(this, "backdrop")) {
      let callbackRemove = function() {
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

  attachEventHandlers() {
    window.addEventListener("focusin", event => this.loopFocus(event));
  },

  removeEventHandlers() {
    window.removeEventListener("focusin", this.loopFocus(event), false);
  },

  loopFocus(event) {
    let modalEl = get(this, "modalElement");
    if (
      document !== event.target &&
      modalEl &&
      modalEl !== event.target &&
      !modalEl.contains(event.target)
    ) {
      this.takeFocus();
    }
  },

  init() {
    this._super(...arguments);
    let { isOpen, backdrop } = getProperties(this, "isOpen", "backdrop");
    set(this, "_showBackdrop", isOpen && backdrop);
  },
  didInsertElement() {
    this._super(...arguments);
    if (get(this, "isOpen")) {
      this.show();
      this.attachEventHandlers();
    }
  },
  willDestroyElement() {
    this._super(...arguments);
    this.removeEventHandlers();
    this.hide();
  }
});
