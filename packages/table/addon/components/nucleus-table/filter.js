import {
  tagName,
  layout as templateLayout,
} from '@ember-decorators/component';
import defaultProp from '@freshworks/core/utils/default-decorator';
import { action, computed, set } from '@ember/object';

import Component from '@ember/component';
import layout from "../../templates/components/nucleus-table/filter";

/**
  __Usage:__

  [Refer component page](/docs/components/nucleus-table/filter)

  @class Nucleus Table
  @namespace Components
  @extends Ember.Component
  @public
*/
@templateLayout(layout)
@tagName('')
class NucleusTableFilter extends Component {
  @defaultProp
  showFilters = false;

  @defaultProp
  columns;

  _columns = this.get('columns');

  @computed('columns.@each.selected')
  get selectedColumns() {
    let columns = this.get('columns');
    return columns.filterBy('selected');
  }

  @action
  toggleFilters() {
    this.toggleProperty('showFilters');
  }

  @action
  clickColumn(column) {
    let columns = this.get('columns');
    columns.forEach((currentColumn) => {
      if(currentColumn.name === column.name) {
        set(currentColumn, 'selected', !currentColumn.selected);
      }
    });
    this.set('columns', columns);
  }

  @action
  onFilterUpdate() {
    let selectedColumns = this.get('selectedColumns');
    this.get('onUpdate') && this.get('onUpdate')(selectedColumns);
  }

  @action
  onReset() {
    this.send('toggleFilters');
    // this.set('columns', allColumns);
  }
}

export default NucleusTableFilter;
