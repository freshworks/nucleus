import { set, get, action, computed } from '@ember/object';
import { classNames, layout as templateLayout } from '@ember-decorators/component';
import layout from "../templates/components/nucleus-datepicker-range-input";
import NucleusInputDatepicker from './nucleus-datepicker-input';

/**
  __Usage:__

  [Refer component page](/docs/components/nucleus-datepicker)

  @class NucleusDatepickerRangeInput
  @namespace Components
  @extends Ember.Component
  @public
*/
@templateLayout(layout)
@classNames('nucleus-datepicker-input')
class NucleusDatepickerRangeInput extends NucleusInputDatepicker {

  /**
  * selectedStartDate
  *
  * @field selectedStartDate 
  * @description the selected start date on the calendar in view.
  * @type string
  * @public
  */
  selectedStartDate = null;

/**
  * selectedEndDate
  *
  * @field selectedEndDate 
  * @description the selected end date on the calendar in view.
  * @type string
  * @public
  */
  selectedEndDate = null;

  /**
  * selectedDate
  *
  * @field selectedDate 
  * @type string
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
      if(newStartDate > newEndDate) {
        let switchDate = newStartDate;
        newStartDate = newEndDate;
        newEndDate = switchDate;
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

  /**
  * updateInput
  *
  * @method updateInput 
  * @param {date} date
  * @public
  *
  */  
  @action
  updateInput(date) {
    set(this, 'selectedStartDate', date.start);
    set(this, 'selectedEndDate', date.end)
    set(this, 'isModalOpen', false);
  }

}

export default NucleusDatepickerRangeInput;
