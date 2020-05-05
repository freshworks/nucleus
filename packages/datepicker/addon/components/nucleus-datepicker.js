import { classNames, layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../templates/components/nucleus-datepicker';
import defaultProp from '@freshworks/core/utils/default-decorator';
import { set, setProperties, get, action, computed } from '@ember/object';
import { parseDate } from 'ember-power-calendar-utils';
import { DATEPICKER_PERMITTED_DATE_FORMATS as dateFormats } from '../constants/nucleus-datepicker';

/**
  __Usage:__

  [Refer component page](/docs/components/nucleus-datepicker)

  @class NucleusDatepicker
  @namespace Components
  @extends Ember.Component
  @public
*/
@templateLayout(layout)
@classNames('nucleus-datepicker')
class NucleusDatepicker extends Component {
  
  /**
  * formatString
  *
  * @field formatString
  * @type string
  * @public
  */
  formatString = 'd MMM, yyyy';

  /**
  * initialDate
  *
  * @field initialDate
  * @type date|null
  * @default null
  * @readonly
  * @public
  */
  @defaultProp
  initialDate = null;

  /**
  * showHeader
  *
  * @field showHeader
  * @type boolean
  * @default true
  * @readonly
  * @public
  */
  @defaultProp
  showHeader = true;
  
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
  * selectedDate
  *
  * @field selectedDate 
  * @description the selected date on the calendar in view.
  * @type string
  * @public
  */
  @computed('initialDate', function () {
    let initialDate = get(this, 'initialDate');
    return (typeof initialDate === 'string')? (get(this, 'parseDateForMultipleFormats').call(this, initialDate, get(this, 'locale'))) : initialDate;
  })
  selectedDate;

  /**
  * currentDate
  *
  * @field currentDate
  * @type date
  * @public
  */
  @computed('initialDate', {
    get() {
      let initialDate = (get(this, 'initialStartDate'))? get(this, 'initialStartDate') : get(this, 'initialDate');
      initialDate = (typeof initialDate === 'string')? (get(this, 'parseDateForMultipleFormats').call(this, initialDate, get(this, 'locale'))) : initialDate;
      if(initialDate) {
        return initialDate;
      } else {
        return new Date();
      }
    },
    set(key, value) {
      return value;
    }
  })
  currentDate;

  /**
  * changeCurrentDate
  *
  * @method changeCurrentDate 
  * @param {date} newDate
  * @public
  *
  */
  @action
  changeCurrentDate(newDate) {
    set(this, 'currentDate', newDate);
  }

  /**
  * changeSelectedDate
  *
  * @method changeSelectedDate 
  * @param {date} newDate
  * @public
  *
  */
  @action 
  changeSelectedDate(newDate) {
    set(this, 'selectedDate', newDate);
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
      let newDate = get(this, 'parseDateForMultipleFormats').call(this, dateString, get(this, 'locale'));
      if(newDate.toString() === 'Invalid Date') {
        throw new Error('Invalid Date');
      }
      setProperties(this, {
        'selectedDate': newDate,
        'currentDate': newDate
      });
    } catch(error) {
      let selectedDate = get(this, 'selectedDate');
      set(this, 'selectedDate', selectedDate);
    }
  }

  /**
  * updateClicked
  *
  * @method updateClicked 
  * @description handler for when update action button is clicked
  * @public
  *
  */
  @action
  updateClicked() {
    let onUpdate = get(this, 'onUpdate');
    if(onUpdate) {
      onUpdate.call(this, get(this, 'selectedDate'));
    }
  }

  /**
  * cancelClicked
  *
  * @method cancelClicked 
  * @description handler for when cancel action button is clicked
  * @public
  *
  */
  @action
  cancelClicked() {
    let onCancel = get(this, 'onCancel');
    if(onCancel) {
      onCancel.call(this);
    }
  }

  /**
  * parseDateForMultipleFormats
  *
  * @method parseDateForMultipleFormats 
  * @description date can be input in any format. 
  * This function identifies the date format and returns date from text.
  * @public
  *
  */
  parseDateForMultipleFormats(dateString, locale) {
    let parsedDate = parseDate(dateString, this.formatString, locale);
    if(parsedDate.toString() === "Invalid Date") {
      for (let i = 1; i < dateFormats.length; i++) {
        let dateFormat = dateFormats[i];
        parsedDate = parseDate(dateString, dateFormat, locale);
        if(parsedDate.toString() !== "Invalid Date") {
          set(this, 'formatString', dateFormat);
          break;
        }
      }
    }
    return parsedDate;
  }
}

export default NucleusDatepicker;
