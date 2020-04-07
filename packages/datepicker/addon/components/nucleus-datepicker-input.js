import { set, get, action, computed } from '@ember/object';
import { observes } from '@ember-decorators/object';
import { classNames, layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import { next } from '@ember/runloop';
import defaultProp from '@freshworks/core/utils/default-decorator';
import { formatDate, parseDate } from "ember-power-calendar-utils";
import layout from "../templates/components/nucleus-datepicker-input";
import { DATEPICKER_KEY_CODE, DATEPICKER_MODAL_SELECTOR, DATEPICKER_PERMITTED_DATE_FORMATS as dateFormats } from '../constants/nucleus-datepicker';

/**
  __Usage:__

  [Refer component page](/docs/components/nucleus-datepicker)

  @class NucleusDatepickerInput
  @namespace Components
  @extends Ember.Component
  @public
*/
@templateLayout(layout)
@classNames('nucleus-datepicker-input')
class NucleusDatepickerInput extends Component {

  inputField = null;

  selectedDate = null;

  isModalOpen = false;

  formatString = 'd MMM, yyyy';

  position = {
    top: 'auto',
    left: 'auto'
  };

  @defaultProp
  locale = 'en';

  /* eslint-disable ember/no-observers */
  @observes('isModalOpen')
  datepickerModalOpen(targetObj, keyName) {
    if (targetObj[keyName]) {
      document.body.classList.add("nucleus-modal--open");
      let escFuncBind = (function (event) {
        if(event.key === "Escape") {
          set(this, 'isModalOpen', false);
          document.removeEventListener('keydown', escFuncBind);
        }
      }).bind(this);
      document.addEventListener('keydown', escFuncBind);
    } else {
      document.body.classList.remove("nucleus-modal--open");
      this.inputField.focus();
      this.inputField = null;
    }
  }

  @computed('selectedDate', {
    get(key) {
      let selectedDate = get(this, 'selectedDate');
      let value = (selectedDate)? formatDate(selectedDate, this.formatString, this.locale) : null;
      return value;
    }, 
    /*eslint no-unused-vars: ["error", {"args": "none"}]*/
    set(key, value) {
      return value;
    }
  })
  value;

  @action
  modalOpen(event) {
    set(this, 'isModalOpen', true);
    let targetRect = event.target.getBoundingClientRect();
    set(get(this, 'position'), 'top', (targetRect.top + targetRect.height + 8) + 'px');
    set(get(this, 'position'), 'left', targetRect.left + 'px');

    next(this, function() {
      let calendarRect = document.querySelector(`[data-calendar-id="${this.elementId}"]`).getBoundingClientRect();
      if(calendarRect.bottom > window.innerHeight) {
        set(get(this, 'position'), 'top', (targetRect.top - calendarRect.height - 8) + 'px');
        set(get(this, 'position'), 'left', targetRect.left + 'px');
      }

      this._lockFocusInModal(event.target);
    });
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
  updateInput(date) {
    set(this, 'selectedDate', date);
    set(this, 'isModalOpen', false);
  }

  @action
  inputKeyDown(event) {
    switch(event.keyCode) {
      case DATEPICKER_KEY_CODE.ENTER:
      case DATEPICKER_KEY_CODE.SPACE:
        this.modalOpen(event);
        break;
      default:
        break;
    }
  }

  _lockFocusInModal(target) {
    this.inputField = target;
    let tabElements = document.querySelectorAll(DATEPICKER_MODAL_SELECTOR);
    let index = 0;

    for (let i = 0; i < tabElements.length; i++) {
      const element = tabElements[i];
      
      element.addEventListener('keydown', function(event) {
        switch (event.keyCode) {
          case DATEPICKER_KEY_CODE.TAB:
            event.stopPropagation();
            event.preventDefault();
            if(event.shiftKey) {
              index--;
              if(index === -1) {
                index = tabElements.length - 1;
              }
            } else {
              index++;
              if(index === tabElements.length) {
                index = 0;
              }
            }
            tabElements[index].focus();
            break;
        
          default:
            break;
        }
      });
    }

    tabElements[0].focus();
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

export default NucleusDatepickerInput;
