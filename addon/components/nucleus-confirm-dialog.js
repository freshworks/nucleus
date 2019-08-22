
import Modal from './nucleus-modal';
import layout from '../templates/components/nucleus-confirm-dialog';

export default Modal.extend({
  layout,

  size: 'small',

  title: null,

  closeButton: true,

  closeTitle: 'Cancel',

  submitTitle: 'Confirm'
});
