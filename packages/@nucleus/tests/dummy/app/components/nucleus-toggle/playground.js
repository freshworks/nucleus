import Component from '@ember/component';
import { get, set, action } from "@ember/object";
import {
  registerComputedProperties,
  handlePropertyChange,
  generateCode
} from '../../utils/playground';

const PROPERTIES = [
  {
    name: 'size',
    select: true,
    value: 'medium',
    types: [
      'large',
      'medium',
      'small'
    ]
  },
  {
    name: 'disabled',
    toggle: true,
    value: false,
  },
  {
    name: 'value',
    toggle: true,
    value: false
  }
]
class Playground extends Component {
  properties = PROPERTIES;

  code = null;

  init() {
    super.init(...arguments);
    registerComputedProperties(this, get(this, 'properties'));
    this._generateCode();
  }

  @action
  onchange(name, value) {
    let properties = get(this, 'properties');

    handlePropertyChange(properties, name, value);
    this._generateCode();
  }


  _generateCode() {
    set(this, 'code', generateCode({
      component:'nucleus-toggle',
      properties: get(this, 'properties'),
      multiline: true
    }));
  }
}

export default Playground;
