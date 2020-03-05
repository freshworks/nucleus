import { layout as templateLayout } from '@ember-decorators/component';
import defaultProp from '@freshworks/core/utils/default-decorator';
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
@templateLayout(layout)
class NucleusConfirmDialog extends Modal {
  /**
  * Size of the dialog, defaults to `small`
  *
  * @field size
  * @type string
  * @default `small`
  * @public
  */
  @defaultProp
  size = 'small';

  /**
  * Title of the confirm dialog
  *
  * @field title
  * @type string
  * @public
  */
  @defaultProp
  title = null;

  /**
  * Close button text
  *
  * @field closeTitle
  * @type string
  * @public
  */
  @defaultProp
  closeTitle = 'Cancel';

  /**
  * Submit action button text
  *
  * @field submitTitle
  * @type string
  * @public
  */
  @defaultProp
  submitTitle = 'Confirm';
  
  /**
  * Disable the action button
  *
  * @field submitDisabled
  * @type boolean
  * @public
  */
  @defaultProp
  submitDisabled = false;
}

export default NucleusConfirmDialog;
