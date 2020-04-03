import {
  classNames,
  layout as templateLayout,
} from '@ember-decorators/component';

import Component from '@ember/component';
import layout from "../templates/components/nucleus-datepicker";

/**
  __Usage:__

  [Refer component page](/docs/components/nucleus-datepicker)

  @class Nucleus Datepicker
  @namespace Components
  @extends Ember.Component
  @public
*/
@templateLayout(layout)
@classNames('nucleus-datepicker')
class NucleusDatepicker extends Component {
  basicText = "Hello World"
}

export default NucleusDatepicker;
