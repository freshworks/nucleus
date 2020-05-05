import { setProperties, get, action, computed } from '@ember/object';
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
      let locale = get(this, 'locale');
      let parsedDates = dateString.split(' to ');
      let newStartDate = get(this, 'parseDateForMultipleFormats').call(this, parsedDates[0], locale);
      let newEndDate = (parsedDates[1])? get(this, 'parseDateForMultipleFormats').call(this, parsedDates[1], locale) : null;
      if(newStartDate.toString() === 'Invalid Date') {
        throw new Error('Invalid Date');
      }
      if(newStartDate > newEndDate) {
        let switchDate = newStartDate;
        newStartDate = newEndDate;
        newEndDate = switchDate;
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
    setProperties(this, {
      'selectedStartDate': date.start,
      'selectedEndDate': date.end,
      'isModalOpen': false
    });
  }

}

export default NucleusDatepickerRangeInput;
