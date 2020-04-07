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

  @defaultProp
  initialStartDate = null;

  @defaultProp
  initialEndDate = null;

  @computed('initialStartDate', function () {
    return (typeof this.initialStartDate === "string")? this.parseDateForMultipleFormats(this.initialStartDate) : this.initialStartDate;
  })
  selectedStartDate;

  @computed('initialEndDate', function () {
    return (typeof this.initialEndDate === "string")? this.parseDateForMultipleFormats(this.initialEndDate) : this.initialEndDate;
  })
  selectedEndDate;

  @computed('selectedStartDate', 'selectedEndDate', function () {
    let selectedDate = {
      'start': get(this, 'selectedStartDate'),
      'end': get(this, 'selectedEndDate')
    };
    return selectedDate;
  })
  selectedDate;

  @computed('currentDate', function() {
    let nextMonthDate = add(get(this, 'currentDate'), 1, 'month');
    return nextMonthDate;
  })
  nextMonthDate;

  @action
  changeCurrentDate(newDate) {
    set(this, 'currentDate', newDate);
  }

  @action 
  changeSelectedDate(newDate) {
    set(this, 'selectedStartDate', newDate.start);
    set(this, 'selectedEndDate', newDate.end);
  }

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
