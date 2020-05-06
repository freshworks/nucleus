import { layout as templateLayout } from '@ember-decorators/component';
import defaultProp from '@freshworks/core/utils/default-decorator';
import layout from "../../templates/components/nucleus-datepicker-range/navigation";
import NavigationBase from '../_base/navigation';

@templateLayout(layout)
class Navigation extends NavigationBase {

  /**
  * nextMonthDate
  *
  * @field nextMonthDate
  * @description this populate the second calendar. Acts as the center for second calendar
  * @type date|null
  * @readonly
  * @public
  * 
  */
  @defaultProp
  nextMonthDate =  null;
  
}

export default Navigation;
