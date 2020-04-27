import { set, get, action, computed } from '@ember/object';
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
    return (typeof this.initialStartDate === "string")? this.parseDateForMultipleFormats(this.initialStartDate) : this.initialStartDate;
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
    return (typeof this.initialEndDate === "string")? this.parseDateForMultipleFormats(this.initialEndDate) : this.initialEndDate;
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
    set(this, 'selectedStartDate', newDate.start);
    set(this, 'selectedEndDate', newDate.end);
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
      let parsedDates = dateString.split(' to ');
      let newStartDate = this.parseDateForMultipleFormats(parsedDates[0], this.locale);
      let newEndDate = (parsedDates[1])? this.parseDateForMultipleFormats(parsedDates[1], this.locale) : null;
      if(newStartDate.toString() === 'Invalid Date') {
        throw new Error('Invalid Date');
      }
      set(this, 'selectedStartDate', newStartDate);
      set(this, 'currentDate', newStartDate);
      set(this, 'selectedEndDate', newEndDate)
    } catch(error) {
      let selectedStartDate = get(this, 'selectedStartDate');
      let selectedEndDate = get(this, 'selectedEndDate');
      set(this, 'selectedStartDate', selectedStartDate);
      set(this, 'selectedEndDate', selectedEndDate);
    }
  }

}

export default NucleusDatepickerRange;
