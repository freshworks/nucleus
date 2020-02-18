import {
  tagName,
  layout as templateLayout,
} from '@ember-decorators/component';
import defaultProp from '@freshworks/core/utils/default-decorator';
import { computed } from '@ember/object';

import Component from '@ember/component';
import layout from "../templates/components/nucleus-icon";

/**
  __Usage:__
  [Refer component page](/docs/components/nucleus-icon)
  @class Nucleus Icon
  @namespace Components
  @extends Ember.Component
  @public
*/

@templateLayout(layout)
@tagName('')
class NucleusIcon extends Component {
  /**
  * Icon name
  *
  * @field name
  * @type string
  * @default null
  * @public
  */
  @defaultProp
  name = null;

  /**
  * Size
  *
  * @field size
  * @type string
  * @default null
  * @public
  */
  @defaultProp
  size = 'medium';

  /**
  * Variant
  *
  * @field variant
  * @type string
  * @default null
  * @public
  */
  @defaultProp
  variant = 'primary';

  /**
  * Custom class
  *
  * @field customClass
  * @type string
  * @default null
  * @public
  */
  @defaultProp
  customClass = null;

  /**
  * _disabled
  *
  * @computed _disabled
  * @private
  */
  @computed('size', 'variant', 'customClass')
  get _classNames() {
    let customClass = this.get('customClass');
    let size = this.get('size') ? this.get('size') : 'medium';
    let variant = this.get('variant') ? this.get('variant') : 'primary';
    let classNames = `nucleus-icon nucleus-icon--${size} nucleus-icon--${variant}`;
    return customClass ? `${classNames} ${customClass}` : classNames;
  }
}

export default NucleusIcon;