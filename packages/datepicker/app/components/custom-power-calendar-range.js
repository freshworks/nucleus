import EmberPowerCalendar from 'ember-power-calendar/components/power-calendar-range';

export default class extends EmberPowerCalendar {
  navComponent = 'nucleus-datepicker-range/navigation';
  daysComponent = 'nucleus-datepicker-range/days';
}
