import { classNames } from '@ember-decorators/component';
import Component from '@ember/component';
import defaultProp from '@freshworks/core/utils/default-decorator';

@classNames('nucleus-datepicker__header')
class HeaderBase extends Component {

  /**
  * locale
  *
  * @field locale
  * @type string
  * @default 'en'
  * @readonly
  * @public
  */
  @defaultProp
  locale = 'en';

  /**
  * formatString
  *
  * @field formatString
  * @type string
  * @default 'd MMM, yyyy' date format
  * @readonly
  * @public
  */
  @defaultProp
  formatString = 'd MMM, yyyy';

}

export default HeaderBase;
