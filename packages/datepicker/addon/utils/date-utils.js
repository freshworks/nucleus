import startOfMonth from "date-fns/startOfMonth";
import { formatDate } from "ember-power-calendar-utils";

/**
  * getMonthsOfYear
  *
  * @method getMonthsOfYear
  * @description collection of all months of the year 
  * @param {date} date
  * @param {string} locale
  * @public
  *
  */
let getMonthsOfYear = (date, locale) => {
  let months = [];
  let startDate = startOfMonth(date);
  let  { year } = _dateSegments(startDate, locale);
  for (let i = 0; i < 12; i++) {
    let firstDay = new Date(year, i, 1);
    months.push(formatDate(firstDay, 'MMM', locale));
  }
  return months;
};

/**
  * changeDate
  *
  * @method changeDate
  * @description change a date relatively from a passed date
  * @param {date} date
  * @param {string} unit
  * @param {number} toValue new value for the unit
  * @param {string} locale
  * @public
  *
  */
let changeDate = (date, unit="month", toValue=null, locale) => {
  let { day, month, year } = _dateSegments(date, locale);
  if(unit === "month") {
    month = (toValue !== null )? toValue : month;
  } else if(unit === "year") {
    year = (toValue !== null)? toValue : year;
  } else if(unit === "day") {
    day = (toValue !== null)? toValue : day;
  }
  return new Date(year, month, day);
}

/**
  * _dateSegments
  *
  * @method _dateSegments
  * @description divide a date into segments of day month and year
  * @param {date} date
  * @param {string} locale
  * @private
  *
  */
let _dateSegments = (date, locale) => {
  let day = formatDate(date, 'd', locale);
  let month = formatDate(date, 'M', locale);
  let year = formatDate(date, 'yyyy', locale);

  return { day, month: (month - 1), year };
}

export { getMonthsOfYear, changeDate };
