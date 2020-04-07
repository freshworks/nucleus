import { layout as templateLayout } from '@ember-decorators/component';
import { get, computed } from '@ember/object';
import { formatDate } from "ember-power-calendar-utils";
import layout from "../../templates/components/nucleus-datepicker-range/input";
import InputBase from '../_base/input';

@templateLayout(layout)
class Input extends InputBase {

  /**
  * value
  *
  * @field value 
  * @description input value. date formatted to string.
  * @type string
  * @public
  * 
  */
  @computed('selectedStartDate', 'selectedEndDate', {
    get(key) {
      let selectedStartDate = get(this, 'selectedStartDate');
      let selectedEndDate = get(this, 'selectedEndDate');
      let value;
      if(selectedStartDate && selectedEndDate) {
        value = formatDate(selectedStartDate, this.formatString, this.locale) + ' to ' + formatDate(selectedEndDate, this.formatString, this.locale);
      } else if(selectedStartDate || selectedEndDate) {
        value = (selectedStartDate)? formatDate(selectedStartDate, this.formatString, this.locale) : formatDate(selectedEndDate, this.formatString, this.locale);
      } else {
        value = null;
      }
      return value;
    }, 
    /*eslint no-unused-vars: ["error", {"args": "none"}]*/
    set(key, value) {
      return value;
    }
  })
  value;

  /**
  * ariaLabelText
  *
  * @field ariaLabelText 
  * @type string
  * @public
  * 
  */
  @computed('selectedStartDate', 'selectedEndDate', function () {
    let selectedStartDate = get(this, 'selectedStartDate');
    let selectedEndDate = get(this, 'selectedEndDate');
    return (selectedStartDate && selectedEndDate)? 'labels.range_input_with_value' : 'labels.range_input';
  })
  ariaLabelText;

}

export default Input;
