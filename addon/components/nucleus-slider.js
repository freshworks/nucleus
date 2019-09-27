import Modal from './nucleus-modal';
import layout from '../templates/components/nucleus-slider';

/**
  __Usage:__
  [Refer component page](/docs/components/nucleus-slider)

  Furthermore references to the following actions are yielded:
  * `close`: triggers the `onClose` action and closes the modal
  * `submit`: triggers the `onSubmit` action

  @class Nucleus Slider
  @namespace Components
  @extends Ember.Component
  @public
*/
export default Modal.extend({
  layout,

  /**
  * Default slider position
  *
  * @field position
  * @type string
  * @default `right`
  * @public
  */
 position: 'right',

  /**
  * Title of the slider
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