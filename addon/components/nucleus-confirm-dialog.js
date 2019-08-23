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
  * size
  *
  * @field size
  * @type string
  * @public
  */
  size: 'small',

  /**
  * title
  *
  * @field title
  * @type null
  * @public
  */
  title: null,

  /**
  * closeButton
  *
  * @field closeButton
  * @type boolean
  * @public
  */
  closeButton: true,

  /**
  * closeTitle
  *
  * @field closeTitle
  * @type string
  * @public
  */
  closeTitle: 'Cancel',

  /**
  * submitTitle
  *
  * @field submitTitle
  * @type string
  * @public
  */
  submitTitle: 'Confirm'
});