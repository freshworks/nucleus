import { classNames } from '@ember-decorators/component';
import Component from '@ember/component';
import defaultProp from '@freshworks/core/utils/default-decorator';
import { get, action } from '@ember/object';

@classNames('nucleus-datepicker__calendar')
class CalendarBase extends Component {

  /**
  * currentDate
  *
  * @field currentDate
  * @type date
  * @default date
  * @readonly
  * @public
  */
  @defaultProp
  currentDate = new Date();

  /**
  * selectedDate
  *
  * @field selectedDate
  * @type date
  * @default null
  * @readonly
  * @public
  */
  @defaultProp
  selectedDate = null;

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
  * @default 'd MMM, yyy' date format
  * @readonly
  * @public
  */
  @defaultProp
  formatString = 'd MMM, yyyy';

  /**
  * modifySelectedDate
  *
  * @method modifySelectedDate
  * @param {date} newDate
  * @public
  *
  */
  @action
  modifySelectedDate(newDate) {
    get(this, 'changeSelectedDate').call(this, newDate.date);
  }

  /**
  * modifyCurrentDate
  *
  * @method modifyCurrentDate
  * @param {date} newDate
  * @public
  *
  */
  @action
  modifyCurrentDate(newDate) {
    get(this, 'changeCurrentDate').call(this, newDate.date);
  }

}

export default CalendarBase;
