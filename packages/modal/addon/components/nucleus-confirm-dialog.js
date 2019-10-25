import Modal from './nucleus-modal';
import layout from '../templates/components/nucleus-confirm-dialog';

/**
  __Usage:__
  [Refer component page](/docs/components/nucleus-confirm-dialog)

  Furthermore references to the following actions are yielded:
  * `close`: triggers the `onClose` action and closes the modal
  * `submit`: triggers the `onSubmit` action

  @class Nucleus Confirm Dialog
  @namespace Components
  @extends Ember.Component
  @public
*/
export default Modal.extend({
  layout,

  /**
  * Size of the dialog, defaults to `small`
  *
  * @field size
  * @type string
  * @default `small`
  * @public
  */
  size: 'small',

  /**
  * Title of the confirm dialog
  *
  * @field title
  * @type string
  * @public
  */
  title: null,

  /**
  * Close button text
  *
  * @field closeTitle
  * @type string
  * @public
  */
  closeTitle: 'Cancel',

  /**
  * Submit action button text
  *
  * @field submitTitle
  * @type string
  * @public
  */
  submitTitle: 'Confirm'
});