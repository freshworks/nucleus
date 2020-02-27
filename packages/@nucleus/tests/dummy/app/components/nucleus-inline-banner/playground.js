import Component from '@ember/component';
import { get, set, action } from "@ember/object";
import {
  registerComputedProperties,
  handlePropertyChange,
  generateCode
} from '../../utils/playground';

const PROPERTIES = [
  {
    name: 'type',
    select: true,
    value: 'warning',
    types: [
      'warning',
      'danger',
      'success',
      'info'
    ]
  },
  {
    name: 'title',
    input: true,
    value: 'This message has been identified as spam.',
  },
  {
    name: 'isDismissible',
    toggle: true,
    value: true
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
    handlePropertyChange(get(this, 'properties'), name, value);
    this._generateCode();
  }


  _generateCode() {
    let attributes = get(this, 'properties').map((prop) => {
      return {
        name: prop.name,
        value: prop.value,
      }
    });

    set(this, 'code', generateCode({
      component: 'nucleus-icon',
      attributes,
      multiline:true
    }));
  }
}

export default Playground;

