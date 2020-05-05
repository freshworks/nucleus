import { layout as templateLayout } from '@ember-decorators/component';
import defaultProp from '@freshworks/core/utils/default-decorator';
import layout from '../../templates/components/nucleus-datepicker-range/header';
import HeaderBase from '../_base/header';

@templateLayout(layout)
class Header extends HeaderBase {

  /**
  * selectedStartDate
  *
  * @field selectedStartDate
  * @type date|null
  * @default null
  * @readonly
  * @public
  */
  @defaultProp
  selectedStartDate = null;

  /**
  * selectedEndDate
  *
  * @field selectedEndDate
  * @type date|null
  * @default null
  * @readonly
  * @public
  */
  @defaultProp 
  selectedEndDate = null;

}

export default Header;
