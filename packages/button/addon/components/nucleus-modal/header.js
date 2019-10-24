import Component from '@ember/component';
import layout from '../../templates/components/nucleus-modal/header';

/**
  Header Usage:
  @class Header
  @namespace Components
  @extends Ember.Component
  @public
*/
export default Component.extend({
  layout,
  classNames: ['nucleus-modal__header'],

  /**
  * closeButton
  *
  * @field closeButton
  * @type boolean
  * @public
  */
  closeButton: false,

  /**
  * title
  *
  * @field title
  * @type null
  * @public
  */
  title: null
});