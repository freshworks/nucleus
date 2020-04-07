import { layout as templateLayout } from '@ember-decorators/component';
import { get, computed } from '@ember/object';
import { formatDate } from 'ember-power-calendar-utils';
import layout from '../../templates/components/nucleus-datepicker/input';
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
  */
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


  /**
  * ariaLabelText
  *
  * @field ariaLabelText 
  * @type string
  * @public
  */
  @computed('selectedDate', function () {
    let selectedDate = get(this, 'selectedDate');
    return (selectedDate)? 'labels.date_input_with_value' : 'labels.date_input';
  })
  ariaLabelText;

}

export default Input;
