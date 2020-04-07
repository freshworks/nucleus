import { classNames, classNameBindings } from '@ember-decorators/component';
import Component from '@ember/component';
import defaultProp from '@freshworks/core/utils/default-decorator';
import { get, computed, action } from '@ember/object';

@classNames('nucleus-datepicker__input')
@classNameBindings('customClasses')
class Input extends Component {

  /**
  * label
  *
  * @field label
  * @type string
  * @default 'null'
  * @readonly
  * @public
  */
  @defaultProp
  label = null;

  /**
  * placeholder
  *
  * @field placeholder
  * @type string
  * @default ''
  * @readonly
  * @public
  */
  @defaultProp
  placeholder = "";

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
  * formatString
  *
  * @field formatString
  * @type string
  * @default 'd MMM, yyyy' date format
  * @readonly
  * @public
  */
  @defaultProp
  formatString = 'd MMM, yyyy';

  /**
  * customClasses
  *
  * @field customClasses
  * @description to add custom class to the tabs component
  * @type string
  * @readonly
  * @public
  */
  @defaultProp 
  customClasses = '';

  /**
  * name
  *
  * @field name
  * @type string
  * @public
  */
  @computed('label', function() {
    let name = get(this, 'label').toLowerCase();
    return name;
  })
  name;

  /**
  * dateChanged
  *
  * @method dateChanged
  * @description Handler that will be called when a input changes
  * @param {any} event
  * @public
  *
  */
  @action
  dateChanged(event) {
    if(get(this, 'changeSelectedDateByInput')) {
      let newValue = event.target.value;
      get(this, 'changeSelectedDateByInput').call(this, newValue);
    }
  }

  /**
  * keyDownPressed
  *
  * @method keyDownPressed
  * @description Handler to capture enter key
  * @param {any} event
  * @public
  *
  */
  @action
  keyDownPressed(event) {
    if(this.inputKeyDown) {
     get(this, 'inputKeyDown').call(this, event)
    }
  }

}

export default Input;
