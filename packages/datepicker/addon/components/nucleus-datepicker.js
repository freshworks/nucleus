import { classNames, layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../templates/components/nucleus-datepicker';
import defaultProp from '@freshworks/core/utils/default-decorator';
import { set, get, action, computed } from '@ember/object';
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
  
  currentDate = new Date();

  formatString = 'd MMM, yyyy';

  @defaultProp
  initialDate = null;

  @defaultProp
  showHeader = true;
  
  @defaultProp
  locale = 'en';

  @computed('initialDate', function () {
    return (typeof this.initialDate === "string")? this.parseDateForMultipleFormats(this.initialDate) : this.initialDate;
  })
  selectedDate;

  @action
  changeCurrentDate(newDate) {
    set(this, 'currentDate', newDate);
  }

  @action 
  changeSelectedDate(newDate) {
    set(this, 'selectedDate', newDate);
  }

  @action
  changeSelectedDateByInput(dateString) {
    try {
      let newDate = this.parseDateForMultipleFormats(dateString, this.locale);
      if(newDate.toString() === 'Invalid Date') {
        throw new Error('Invalid Date');
      }
      set(this, 'selectedDate', newDate);
      set(this, 'currentDate', newDate);
    } catch(error) {
      let selectedDate = get(this, 'selectedDate');
      set(this, 'selectedDate', selectedDate);
    }
  }

  @action
  updateClicked() {
    let onUpdate = get(this, 'onUpdate');
    if(onUpdate) {
      onUpdate.call(this, get(this, 'selectedDate'));
    }
  }

  @action
  cancelClicked() {
    let onCancel = get(this, 'onCancel');
    if(onCancel) {
      onCancel.call(this);
    }
  }

  parseDateForMultipleFormats(dateString, locale) {
    let parsedDate;
    parsedDate = parseDate(dateString, this.formatString, locale);
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
