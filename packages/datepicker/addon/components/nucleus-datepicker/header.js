import { layout as templateLayout } from '@ember-decorators/component';
import defaultProp from '@freshworks/core/utils/default-decorator';
import layout from '../../templates/components/nucleus-datepicker/header';
import HeaderBase from '../_base/header';

@templateLayout(layout)
class Header extends HeaderBase {

  /**
  * selectedDate
  *
  * @field selectedDate
  * @type date|null
  * @default null
  * @readonly
  * @public
  */
  @defaultProp
  selectedDate = null;
  
}

export default Header;
