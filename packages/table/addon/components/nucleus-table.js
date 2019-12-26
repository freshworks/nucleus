import classic from 'ember-classic-decorator';
import {
  classNames,
  attributeBindings,
  tagName,
  layout as templateLayout,
} from '@ember-decorators/component';
import defaultProp from '@freshworks/core/utils/default-decorator';

import { or, equal } from '@ember/object/computed';
import { run } from '@ember/runloop';
import Component from '@ember/component';
import { set, computed } from '@ember/object';
import layout from "../templates/components/nucleus-table";

/**
  __Usage:__

  [Refer component page](/docs/components/nucleus-button)

  @class Nucleus Button
  @namespace Components
  @extends Ember.Component
  @public
*/
@classic
@templateLayout(layout)
@tagName('table')
@classNames('nucleus-table')
@attributeBindings('_disabled:disabled', '_buttonType:type', '_label:aria-label', 'autofocus')
class NucleusTable extends Component {
  
}

export default NucleusTable;
