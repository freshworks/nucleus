import { set, setProperties, get, action, computed } from '@ember/object';
import { observes } from '@ember-decorators/object';
import { classNames, layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import { next } from '@ember/runloop';
import defaultProp from '@freshworks/core/utils/default-decorator';
import { formatDate, parseDate } from "ember-power-calendar-utils";
import layout from "../templates/components/nucleus-datepicker-input";
import { DATEPICKER_KEY_CODE, DATEPICKER_MODAL_SELECTOR, DATEPICKER_MODAL_TAB_SELECTOR, DATEPICKER_PERMITTED_DATE_FORMATS as dateFormats } from '../constants/nucleus-datepicker';

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

  /**
  * inputField
  *
  * @field inputField
  * @type node
  * @default null
  * @public
  */
  inputField = null;

  /**
  * selectedDate
  *
  * @field selectedDate
  * @type date
  * @default null
  * @public
  */
  selectedDate = null;

  /**
  * isModalOpen
  *
  * @field isModalOpen
  * @type boolean
  * @default false
  * @public
  */
  isModalOpen = false;

  /**
  * formatString
  *
  * @field formatString
  * @type string - date format
  * @default 'd MMM, yyyy'
  * @public
  */
  formatString = 'd MMM, yyyy';

  /**
  * position
  *
  * @field position
  * @description popup position 
  * @type object
  * @default 'd MMM, yyyy'
  * @public
  */
  position = {
    top: 'auto',
    left: 'auto'
  };

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
  @computed('selectedDate', {
    get(key) {
      let selectedDate = get(this, 'selectedDate');
      let value = (selectedDate)? formatDate(selectedDate, get(this, 'formatString'), get(this, 'locale')) : null;
      return value;
    }, 
    /*eslint no-unused-vars: ["error", {"args": "none"}]*/
    set(key, value) {
      return value;
    }
  })
  value;

  /**
  * datepickerModalOpen
  *
  * @method datepickerModalOpen 
  * @description sets event listerners for keyboard events for the modal
  * @public
  *
  */
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

  /**
  * modalOpen
  *
  * @method modalOpen 
  * @description sets isModelOpen variable, positions the popup according to input.
  * @param {any} event
  * @public
  *
  */  
  @action
  modalOpen(event) {
    set(this, 'isModalOpen', true);
    let targetRect = event.target.getBoundingClientRect();
    setProperties(this.position, {
      'top': ((targetRect.top + targetRect.height + 8) + 'px'),
      'left': (targetRect.left + 'px')
    });
    next(this, function() {
      let calendarRect = document.querySelector(`[data-calendar-id="${get(this, 'elementId')}"]`).getBoundingClientRect();
      if(calendarRect.bottom > window.innerHeight) {
        setProperties(this.position, {
          'top': ((targetRect.top - calendarRect.height - 8) + 'px'),
          'left': (targetRect.left + 'px')
        });
      }

      get(this, '_lockFocusInModal').call(this, event.target);
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
      'selectedDate': date,
      'isModalOpen': false
    });
  }

  /**
  * inputKeyDown
  *
  * @method inputKeyDown 
  * @param {any} event
  * @public
  *
  */  
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

  /**
  * _lockFocusInModal
  *
  * @method _lockFocusInModal 
  * @description adds listerners to lock focus inside modal
  * @private
  *
  */
  _lockFocusInModal(target) {
    this.inputField = target;
    let tabElements = document.querySelectorAll(DATEPICKER_MODAL_TAB_SELECTOR);
    let modalElement = document.querySelector(DATEPICKER_MODAL_SELECTOR);
    let index = 0;
      
    modalElement.addEventListener('keydown', function(event) {
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

    tabElements[0].focus();
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
