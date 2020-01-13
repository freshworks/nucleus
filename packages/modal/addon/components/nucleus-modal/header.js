import { classNames, layout as templateLayout } from '@ember-decorators/component';
import defaultProp from '@freshworks/core/utils/default-decorator';
import Component from '@ember/component';
import layout from '../../templates/components/nucleus-modal/header';

/**
  Header Usage:
  @class Header
  @namespace Components
  @extends Ember.Component
  @public
*/
@templateLayout(layout)
@classNames('nucleus-modal__header')
class Header extends Component {
  /**
  * closeButton
  *
  * @field closeButton
  * @type boolean
  * @public
  */
  @defaultProp
  closeButton = false;

  /**
  * title
  *
  * @field title
  * @type null
  * @public
  */
  @defaultProp
  title = null;
}

export default Header;
