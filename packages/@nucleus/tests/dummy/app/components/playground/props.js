import Component from '@ember/component';
import { action } from '@ember/object';

class Props extends Component {
  @action
  handleChange(property, e) {
    let value = (property.toggle) ? e.target.checked : e.target.value;
    this.onchange(property.name, value, e);
  }

}

export default Props;
