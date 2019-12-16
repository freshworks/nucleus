import classic from 'ember-classic-decorator';
import { layout as templateLayout } from '@ember-decorators/component';
import defaultProp from '@freshworks/core/utils/default-decorator';
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
@classic
@templateLayout(layout)
class NucleusSlider extends Modal {
  /**
  * Default slider position
  *
  * @field position
  * @type string
  * @default `right`
  * @public
  */
  @defaultProp
  position = 'right';

  /**
  * Title of the slider
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
}

export default NucleusSlider;
