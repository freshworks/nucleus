import Component from '@ember/component';
import { get, set, action } from "@ember/object";
import {
  registerComputedProperties,
  handlePropertyChange,
  generateCode
} from '../../utils/playground';


const PROPERTIES = [
  {
    name: 'variant',
    select: true,
    value: 'lineCritical',
    types: [
        'lineCritical',
        'lineNeutral',
        'lineNew', 
        'linePrimary' ,
        'solidCritical' ,
        'solidNeutral' , 
        'solidNew' , 
        'solidPrimary'   
    ]
  },
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
    set(this, 'code', generateCode({
      component: 'nucleus-badge',
      properties: get(this, 'properties')
    }));
  }
}

export default Playground;

