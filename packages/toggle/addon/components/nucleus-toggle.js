import {
  tagName,
  layout as templateLayout,
} from '@ember-decorators/component';
// import defaultProp from '@freshworks/core/utils/default-decorator';

import Component from '@ember/component';
import layout from "../templates/components/nucleus-toggle";

/**
  __Usage:__

  [Refer component page](/docs/components/nucleus-toggle)

  @class Nucleus Toggle
  @namespace Components
  @extends Ember.Component
  @public
*/
@templateLayout(layout)
@tagName('')
class NucleusToggle extends Component {

}

export default NucleusToggle;
