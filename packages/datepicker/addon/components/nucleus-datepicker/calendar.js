import { layout as templateLayout } from '@ember-decorators/component';
import layout from '../../templates/components/nucleus-datepicker/calendar';
import CalendarBase from '../_base/calendar';

@templateLayout(layout)
class Calendar extends CalendarBase {

}

export default Calendar;
