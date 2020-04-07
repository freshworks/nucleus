import { layout } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';
import powerCalendarComponent from 'ember-power-calendar/components/power-calendar/days';
import template from '../../templates/components/_base/days';

@layout(template)
class PowerCalendarBase extends powerCalendarComponent {
  
  /**
  * dayOfCurrentMonth
  *
  * @field dayOfCurrentMonth
  * @type date
  * @public
  */
  @computed('calendar.center', 'selectedDate', 'selectedStartDate', function() {
    let tabIndexDate; 
    if(this.calendar.selected && this.calendar.selected.start) {
      tabIndexDate = this.calendar.selected.start;
    } else if(this.calendar.selected && this.calendar.selected.getDate) {
      tabIndexDate = this.calendar.selected;
    } else {
      tabIndexDate = this.calendar.center;
    }
    return tabIndexDate;
  })
  dayOfCurrentMonth;
  
  /**
  * setFocusOnCalendarChange
  *
  * @method setFocusOnCalendarChange
  * @description focus a date when calendar center changes
  * @param {number} keyCode event keycode when calendar changes
  * @param {number} index from calendar days array
  *
  */
  setFocusOnCalendarChange(keyCode, index) {
    let uniqueId = `[data-power-calendar-id="${this.calendar.uniqueId}"] .ember-power-calendar-day-grid`;
    let targetNode = document.querySelector(uniqueId);
    let observerOptions = {
      childList: true,
      subtree: true
    };

    let mutationCallback = (keyCode) => {
      let day, days = this.days;
      switch (keyCode) {
        case 33:
        case 34:
          day = days[index];
          if (!day) {
            day = days[index - 7];
          }
          break;
        case 37:
          index = days.length - 1;
          day = days[index];
          while (!day.isCurrentMonth) {
            index--;
            day = days[index];
          }
          break;
        case 39:
          index = 0;
          day = days[index];
          while (!day.isCurrentMonth) {
            index++;
            day = days[index];
          }
          break;
        default:
          break;
      }
      
      this.set('focusedId', day.id);
      scheduleOnce('afterRender', this, '_focusDate', day.id);
      disconnectCallback(observer);
    }

    let observer = new MutationObserver(mutationCallback.bind(null, keyCode));
    /* eslint-disable ember/no-observers */
    observer.observe(targetNode, observerOptions);
    let disconnectCallback = (obs) => {
      obs.disconnect();
    };
  }

  /**
  * handleClick
  *
  * @method handleClick
  * @description click handler
  * @param {any} event
  * @public
  *
  */
  @action
  handleClick(e) {
    let dayEl = e.target.closest('[data-date]');
    if (dayEl) {
      let dateStr = dayEl.dataset.date;
      let day = this.days.find(d => d.id === dateStr);
      if (day) {
        if (this.calendar.actions.select) {
          this.calendar.actions.select(day, this.calendar, e);
        }
        if (!day.isCurrentMonth) {
          this.calendar.actions.changeCenter(day.date, this.calendar, e);
        }
      }
    }
  }

  /**
  * _focusDate
  *
  * @method _focusDate
  * @description focus a day in calendar
  * @param {id} calendar day id
  * @private
  *
  */
  _focusDate(id) {
    let dayElement = document.querySelector(`[data-power-calendar-id="${this.calendar.uniqueId}"] .ember-power-calendar-day--current-month[data-date="${id}"]`);
    if (dayElement) {
      dayElement.focus();
    }
  }

}

export default PowerCalendarBase;