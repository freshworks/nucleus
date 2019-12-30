import classic from 'ember-classic-decorator';
import {
  tagName,
  layout as templateLayout,
} from '@ember-decorators/component';
// import defaultProp from '@freshworks/core/utils/default-decorator';

import Component from '@ember/component';
import layout from "../templates/components/nucleus-table";

/**
  __Usage:__

  [Refer component page](/docs/components/nucleus-table)

  @class Nucleus Table
  @namespace Components
  @extends Ember.Component
  @public
*/
@classic
@templateLayout(layout)
@tagName('')
class NucleusTable extends Component {
  
}

export default NucleusTable;
