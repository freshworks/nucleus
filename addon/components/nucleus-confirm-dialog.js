import Modal from './nucleus-modal';
import layout from '../templates/components/nucleus-confirm-dialog';

/**
  NucleusConfirmDialog Usage:
  @class NucleusConfirmDialog
  @namespace Components
  @extends Ember.Component
  @public
*/
export default Modal.extend({
  layout,

  /**
  * Default confirm dialog size
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