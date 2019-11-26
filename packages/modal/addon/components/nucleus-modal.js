import classic from 'ember-classic-decorator';
import { layout as templateLayout } from '@ember-decorators/component';
import Component from "@ember/component";
import { set, get, setProperties, computed, action } from "@ember/object";
import { reads } from "@ember/object/computed";
import { later } from '@ember/runloop';
import layout from "../templates/components/nucleus-modal";

/**
  __Usage:__
  [Refer component page](/docs/components/nucleus-modal)

  The component yields references to the following contextual components, that you can use to further customize the output:
  * [modal.body](nucleus-modal/body)
  * [modal.header](nucleus-modal/header)
  * [modal.footer](nucleus-modal/footer)

  Furthermore references to the following actions are yielded:
  * `close`: triggers the `onClose` action and closes the modal
  * `submit`: triggers the `onSubmit` action

  @class Nucleus Modal
  @namespace Components
  @extends Ember.Component
  @public
*/
@classic
@templateLayout(layout)
class Modal extends Component {
  /**
  * Flag to open the modal
  *
  * @field open
  * @type boolean
  * @default false
  * @readonly
  * @public
  */
  open = true;

  /**
  * isOpen
  *
  * @field isOpen
  * @type function
  * @private
  */
  @computed("open", {
    get() {
      return get(this, "open");
    },
    set(key, value) { // eslint-disable-line no-unused-vars
      return value;
    }
  })
  isOpen;

  /**
  * Private flag to prevent multiple show/hide calls
  *
  * @field _isOpen
  * @type boolean
  * @default false
  * @private
  */
  _isOpen = false;

  /**
  * Flag to show or hide the translucent backdrop.
  *
  * @field backdrop
  * @type boolean
  * @public
  */
  backdrop = true;

  /**
  * Flag to enable or disable dismiss option. `false` hides the close button and disables close on Escape.
  *
  * @field isDismissible
  * @type boolean
  * @public
  */
  isDismissible = true;

  /**
  * _showBackdrop
  *
  * @field _showBackdrop
  * @type boolean
  * @private
  */
  @reads("backdrop")
  _showBackdrop;

  /**
  * Modal sizes: `small`, `medium` & `large`
  *
  * @property size
  * @type string|null
  * @default null
  * @public
  */
  size = null;

  /**
  * Render the Modal markup in-place (true) or in wormhole (false)
  *
  * @field renderInPlace
  * @type boolean
  * @default false
  * @public
  */
  renderInPlace = false;

  /**
  * modalId
  *
  * @field modalId
  * @type string
  * @private
  */
  @computed('elementId', function() {
    return `nucleus-modal-${get(this, 'elementId')}`;
  })
  modalId;

  /**
  * modalElement
  *
  * @field modalElement
  * @type function
  * @private
  */
  @computed('modalId', function() {
    return document.getElementById(get(this, "modalId"));
  })
  modalElement;

  /**
  * close
  *
  * @method close
  * @public
  *
  */
  @action
  close() {
    if (get(this, 'onClose')) {
      get(this, 'onClose')();
    }
    this._hide();
  }

  /**
  * submit
  *
  * @method submit
  * @public
  *
  */
  @action
  submit() {
    if (get(this, 'onSubmit')) {
      return get(this, 'onSubmit')();
    }
  }

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
  }

  /**
  * show
  *
  * @method show
  * @private
  *
  */
  _show() {
    if (get(this, "_isOpen")) {
      return;
    }
    set(this, "_isOpen", true);
    document.body.classList.add("nucleus-modal--open");
  }

  /**
  * hide
  *
  * @method hide
  * @private
  *
  */
  _hide() {
    if (!get(this, "_isOpen")) {
      return;
    }
    setProperties(this, {
      isOpen: false,
      _isOpen: false
    });
    document.body.classList.remove("nucleus-modal--open");
  }

  /**
  * attachEventHandlers
  *
  * @method attachEventHandlers
  * @private
  *
  */
  attachEventHandlers() {
    window.addEventListener("focusin", event => this.loopFocus(event));
  }

  /**
  * removeEventHandlers
  *
  * @method removeEventHandlers
  * @private
  *
  */
  removeEventHandlers() {
    window.removeEventListener("focusin", this.loopFocus(event), false);
  }

  /**
  * loopFocus
  *
  * @method loopFocus
  * @private
  * @param {any} event
  */
  loopFocus(event) {
    let modalEl = get(this, "modalElement");

    if (event && modalEl && modalEl !== event.target && !modalEl.contains(event.target)) {
      event.preventDefault();
      this._takeFocus(event);
    }
  }

  _initialize() {
    this._show();
    later(this, () => { // to make sure the DOM has rendered
      this.attachEventHandlers();
      this._takeFocus();
    }, 500);
  }

  _dismantle() {
    this._hide();
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);
    get(this, 'isOpen')
      ? this._initialize()
      : this._dismantle();
  }

  willDestroyElement() {
    super.willDestroyElement(...arguments);
    this.removeEventHandlers();
  }

}

export default Modal;