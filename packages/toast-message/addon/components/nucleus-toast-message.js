import defaultProp from '@freshworks/core/utils/default-decorator';
import { layout as templateLayout } from '@ember-decorators/component';
import { inject } from '@ember/service';
import Component from '@ember/component';
import layout from '../templates/components/nucleus-toast-message';
import { ICON_MAP } from '../constants/nucleus-toast-message';

/**
  __Usage:__
  [Refer component page](/docs/components/nucleus-toast-message)

  @class Nucleus Toast Message
  @namespace Components
  @extends Ember.Component
  @public
*/
@templateLayout(layout)
class NucleusToastMessage extends Component {
  /**
  * Queue service which manages the toast messages.
  * More info [here](https://github.com/poteto/ember-cli-flash#custom-messages-api)
  *
  * @field flashMessages
  * @type function
  * @public
  */
  @inject()
  flashMessages;

  /**
  * Controls the positioning of the toast messages.
  * `(top|bottom) (left|right|center)`
  *
  * @field position
  * @type string
  * @public
  */
  @defaultProp
  position = 'top center';

  _iconMap = ICON_MAP;
}

export default NucleusToastMessage;
