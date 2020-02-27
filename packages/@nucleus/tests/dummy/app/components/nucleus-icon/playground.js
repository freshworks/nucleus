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
    value: 'large',
    types: [
      'small',
      'medium',
      'large'
    ]
  },
  {
    name: 'variant',
    select: true,
    value: 'none',
    types: [
      'none',
      'danger',
      'success'
    ]
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
    let props = get(this, 'properties').map((prop) => {
      return {
        name: prop.name,
        value: prop.value,
      }
    });

    let staticProps = [
      {
        name: 'name',
        value: 'nucleus-circle-help'
      }
    ];

    set(this, 'code', generateCode('nucleus-icon', [...staticProps, ...props]));
  }
}

export default Playground;

