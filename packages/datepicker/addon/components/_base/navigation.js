import { A } from '@ember/array';
import { get, action } from '@ember/object';
import { classNames } from '@ember-decorators/component';
import Component from '@ember/component';
import defaultProp from '@freshworks/core/utils/default-decorator';
import { getMonthsOfYear, changeDate } from "../../utils/date-utils";

@classNames('nucleus-datepicker__navigation')
class NavigationBase extends Component {

  /**
  * calendar
  *
  * @field calendar
  * @description the calendar object from power calendar
  * @type object|null
  * @default null
  * @readonly
  * @public
  */
  @defaultProp
  calendar = null;

  /**
  * currentDate
  *
  * @field currentDate
  * @type date|null
  * @default null
  * @readonly
  * @public
  */
  @defaultProp
  currentDate = null;

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
  * months
  *
  * @field months
  * @description Collection of months for navigation.
  * @type array
  * @public
  */
  months = A([]);

  /**
  * years
  *
  * @field years
  * @description Collection of years for navigation.
  * @type array
  * @public
  */
  years = Array(...Array(80)).map((_, i) => `${i + 2010}`);

  /**
  * didInsertElement
  *
  * @method didInsertElement
  * @description lifecycle event
  * @public
  *
  */
  didInsertElement() {
    let currentDate = get(this, "currentDate");
    let months = getMonthsOfYear(currentDate, this.locale);
    get(this, "months").setObjects(months);
  }

  /**
  * changeCenter
  *
  * @method changeCenter
  * @param {string} unit
  * @param {object} calendar
  * @param {any} event
  * @public
  *
  */
  @action
  changeCenter(unit, calendar, e) {
    let newValue =  (unit === "month")? get(this, "months").indexOf(e.target.value) : e.target.value;
    let newCenter = changeDate(calendar.center, unit, newValue, this.locale);
    calendar.actions.changeCenter(newCenter, calendar, e);
  }
  
}

export default NavigationBase;
