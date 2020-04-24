import {
  classNames,
  classNameBindings,
  attributeBindings,
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
@attributeBindings('_label:aria-label')
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
  * Optional aria-label attribute
  *
  * @field ariaLabel
  * @type string
  * @default null
  * @public
  */
 @defaultProp
 ariaLabel = null;

 /**
  * _label
  *
  * @field _label
  * @type function
  * @private
  */
 @computed( 'ariaLabel')
 get _label() {
   return this.get('ariaLabel') ;
 }

 /**
 * Badge display variants: `lineCritical`, `lineNeutral`, `lineNew`, `linePrimary` , `solidCritical` , `solidNeutral' , `solidNew` , `solidPrimary` & `solidPrimary`
 *
 * @field variant
 * @type string
 * @default 'lineCritical'
 * @public
 */
 @defaultProp
 variant = 'lineCritical';


 /**
 * _typeClass
 *
 * @computed _typeClass
 * @private
 */
 @computed('variant')
 get _typeClass() {
   let type = this.get('variant');
   return type ? `nucleus-badge--${type}` : 'nucleus-badge--lineCritical';
 }


}

export default NucleusBadge;
