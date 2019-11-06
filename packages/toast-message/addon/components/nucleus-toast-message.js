import Component from '@ember/component';
import { inject } from '@ember/service';
import layout from '../templates/components/nucleus-toast-message';

/**
  __Usage:__
  [Refer component page](/docs/components/nucleus-toast-message)

  @class Nucleus Toast Message
  @namespace Components
  @extends Ember.Component
  @public
*/
export default Component.extend({
  layout,

  /**
  * Queue service which manages the toast messages.
  * More info [here](https://github.com/poteto/ember-cli-flash#custom-messages-api)
  *
  * @field flashMessages
  * @type function
  * @public
  */
  flashMessages: inject(),

  /**
  * Controls the positioning of the toast messages.
  * `(top|bottom) (left|right|center)`
  *
  * @field position
  * @type string
  * @public
  */
  position: 'top center'
});