import {
  classNames,
  classNameBindings,
  layout as templateLayout,
} from '@ember-decorators/component';
import defaultProp from '@freshworks/core/utils/default-decorator';
import Component from '@ember/component';
import layout from "../templates/components/nucleus-badge";
import { computed } from '@ember/object';


/**
  __Usage:__

  [Refer component page](/docs/components/nucleus-badge)

  @class Nucleus Badge
  @namespace Components
  @extends Ember.Component
  @public
*/
@templateLayout(layout)
@classNames('nucleus-badge')
@classNameBindings(
  '_typeClass'
)
class NucleusBadge extends Component {
   /**
  * Default badge text
  *
  * @field label
  * @type string|null
  * @default null
  * @public
  */
 @defaultProp
 label = null;

 /**
  * data-test-id
  *
  * @field data-test-id
  * @type string
  * @private
  */
 'data-test-id' = 'nucleus-badge';

 /**
 * Badge display type of variants:  `line` or `solid`
 * @field type
 * @type string
 * @default line
 * @public
 */
 @defaultProp
 type = 'line';

 /**
 * Badge display variants: `critical`, `neutral`, `new` & `primary` 
 *
 * @field variant
 * @type string
 * @default 'critical'
 * @public
 */
 @defaultProp
 variant = 'critical';


 /**
 * _typeClass
 *
 * @computed _typeClass
 * @private
 */
  @computed('variant')
  get _typeClass() {
    let type = this.get('variant');
    if(this.type === 'solid') {
      return type ? `nucleus-badge--solid--${type}` : 'nucleus-badge--solid--critical';
    }
    return type ? `nucleus-badge--line--${type}` : 'nucleus-badge--line--critical';
 }
}

export default NucleusBadge;
