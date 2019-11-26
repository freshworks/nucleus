import classic from 'ember-classic-decorator';
import { classNames, layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../../templates/components/nucleus-modal/header';

/**
  Header Usage:
  @class Header
  @namespace Components
  @extends Ember.Component
  @public
*/
@classic
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
  closeButton = false;

  /**
  * title
  *
  * @field title
  * @type null
  * @public
  */
  title = null;
}

export default Header;