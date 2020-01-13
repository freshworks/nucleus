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

  @computed('columns.[]')
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
    columns.forEach((currentColumn, index) => {
      if(currentColumn.name === column.name) {
        set(currentColumn, 'selected', true);
        // this.set(`${this.get('columns')}[${index}].selected`, !column.selected);
      }
    });
    this.set('columns', columns);
  }
}

export default NucleusTableFilter;
