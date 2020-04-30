import { setProperties, get, action, computed } from '@ember/object';
import { classNames, layout as templateLayout } from '@ember-decorators/component';
import defaultProp from '@freshworks/core/utils/default-decorator';
import layout from '../templates/components/nucleus-datepicker-range';
import { add } from 'ember-power-calendar-utils';
import NucleusDatePicker from './nucleus-datepicker';

/**
  __Usage:__

  [Refer component page](/docs/components/nucleus-datepicker)

  @class NucleusDatepickerRange
  @namespace Components
  @extends Ember.Component
  @public
*/
@templateLayout(layout)
@classNames('nucleus-range-datepicker')
class NucleusDatepickerRange extends NucleusDatePicker {

  /**
  * initialStartDate
  *
  * @field initialStartDate
  * @type date|null
  * @default null
  * @readonly
  * @public
  */
  @defaultProp
  initialStartDate = null;

  /**
  * initialEndDate
  *
  * @field initialEndDate
  * @type date|null
  * @default null
  * @readonly
  * @public
  */
  @defaultProp
  initialEndDate = null;

  /**
  * selectedStartDate
  *
  * @field selectedStartDate 
  * @description the selected start date on the calendar in view.
  * @type date|null
  * @public
  */
  @computed('initialStartDate', function () {
    let initialStartDate = get(this, 'initialStartDate');
    return (typeof initialStartDate === "string")? (get(this, 'parseDateForMultipleFormats').call(this, initialStartDate)) : initialStartDate;
  })
  selectedStartDate;

  /**
  * selectedEndDate
  *
  * @field selectedEndDate 
  * @description the selected end date on the calendar in view.
  * @type date|null
  * @public
  */
  @computed('initialEndDate', function () {
    let initialEndDate = get(this, 'initialEndDate');
    return (typeof initialEndDate === "string")? (get(this, 'parseDateForMultipleFormats').call(this, initialEndDate)) : initialEndDate;
  })
  selectedEndDate;

  /**
  * selectedDate
  *
  * @field selectedDate 
  * @description the selected date object that contains both start and end dates on the calendar in view.
  * @type object
  * @public
  */
  @computed('selectedStartDate', 'selectedEndDate', function () {
    let selectedDate = {
      'start': get(this, 'selectedStartDate'),
      'end': get(this, 'selectedEndDate')
    };
    return selectedDate;
  })
  selectedDate;

  /**
  * nextMonthDate
  *
  * @field nextMonthDate 
  * @description calendar center for second calendar in range variant
  * @type object
  * @public
  */
  @computed('currentDate', function() {
    let nextMonthDate = add(get(this, 'currentDate'), 1, 'month');
    return nextMonthDate;
  })
  nextMonthDate;

  /**
  * changeSelectedDate
  *
  * @method changeSelectedDate 
  * @description sets the start and end dates from date param object
  * @param {date} newDate
  * @public
  *
  */
  @action 
  changeSelectedDate(newDate) {
    setProperties(this, {
      'selectedStartDate': newDate.start,
      'selectedEndDate': newDate.end
    });
  }

  /**
  * changeSelectedDateByInput
  *
  * @method changeSelectedDateByInput 
  * @param {string} dateString
  * @public
  *
  */
  @action
  changeSelectedDateByInput(dateString) {
    try {
      let locale = get(this, 'locale');
      let parsedDates = dateString.split(' to ');
      let newStartDate = get(this, 'parseDateForMultipleFormats').call(this, parsedDates[0], locale);
      let newEndDate = (parsedDates[1])? (get(this, 'parseDateForMultipleFormats').call(this, parsedDates[1], locale)) : null;
      if(newStartDate.toString() === 'Invalid Date') {
        throw new Error('Invalid Date');
      }
      setProperties(this, {
        'selectedStartDate': newStartDate,
        'currentDate': newStartDate,
        'selectedEndDate': newEndDate
      });
    } catch(error) {
      let selectedStartDate = get(this, 'selectedStartDate');
      let selectedEndDate = get(this, 'selectedEndDate');
      setProperties(this, {
        'selectedStartDate': selectedStartDate,
        'selectedEndDate': selectedEndDate
      });
    }
  }

}

export default NucleusDatepickerRange;
