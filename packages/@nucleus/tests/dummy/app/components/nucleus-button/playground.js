import Component from '@ember/component';
import { get, set, action } from "@ember/object";
import {
  registerComputedProperties,
  handlePropertyChange,
  generateCode
} from '../../utils/playground';

import icons from '../../constants/icons';

const PROPERTIES = [
  {
    name: 'label',
    input: true,
    value: 'Click here',
  },
  {
    name: 'variant',
    select: true,
    value: 'primary',
    types: [
      'primary',
      'secondary',
      'danger',
      'link',
      'text'
    ]
  },
  {
    name: 'size',
    select: true,
    value: 'none',
    types: [
      'none',
      'small',
      'mini'
    ]
  },
  {
    name: 'block',
    toggle: true,
    value: false,
  },
  {
    name: 'disabled',
    toggle: true,
    value: false,
  },
  {
    name: 'icon',
    select: true,
    value: 'none',
    types: [
      'none',
      ...icons
    ]
  },
  {
    name: 'iconSize',
    select: true,
    value: 'none',
    types: [
      'none',
      'medium',
      'small',
      'mini'
    ]
  },
  {
    name: 'iconOnly',
    toggle: true,
    value: false,
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

    if (name === 'iconOnly' && !name.value) {
      this._handleIconOnly(properties);
    }

    handlePropertyChange(properties, name, value);
    this._generateCode();
  }


  _generateCode() {
    set(this, 'code', generateCode({
      component:'nucleus-button',
      properties: get(this, 'properties'),
      multiline: true
    }));
  }

  _handleIconOnly(properties) {
     let changables = ['label', 'variant', 'icon'];
      let [
        label,
        type,
        icon
      ] = properties.filter(prop => changables.includes(prop.name));

      set(label, 'value', '');
      set(type, 'value', 'text');
      set(icon, 'value', (icon.value === 'none') ? icon.types[1] : icon.value);
  }
}

export default Playground;
