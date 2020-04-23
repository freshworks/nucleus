import {
  classNames,
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

 

 /**
 * `onClick` action handler
 *
 * @field onClick
 * @type function
 * @public
 */
 @defaultProp
 onClick = null;

 
 /**
 * click
 *
 * @method click
 * @public
 *
 */
 click() {
   let action = this.get('onClick');

   if (action === null || action === undefined) {
     return;
   }
   return false;
 }

}

export default NucleusBadge;
