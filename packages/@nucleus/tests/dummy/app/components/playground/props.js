import Component from '@ember/component';
import { action } from '@ember/object';

class Props extends Component {
  @action
  handleChange(property, e) {
    let value = e.target.value;
    if (property.toggle) {
      value = (value === 'false') ? true : false;
    }
    this.onchange(property.name, value, e);
  }

}

export default Props;
