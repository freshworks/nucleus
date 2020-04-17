import {
  tagName,
  layout as templateLayout,
} from '@ember-decorators/component';
import defaultProp from '@freshworks/core/utils/default-decorator';
import { action, computed, set } from '@ember/object';
import { A } from '@ember/array';
import Component from '@ember/component';
import layout from "../../templates/components/nucleus-table/table";

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
class Table extends Component {

  @defaultProp
  canFilter=true;
  /**
  * selectedColumns
  *
  * @field selectedColumns
  * @type function
  * @private
  */
  @computed("columns", {
  get() {
    let arrayFirst = A([{ name: '', valuePath: '', selected: true, disabled: false}]);
    return arrayFirst.concat(this.columns.filterBy('selected'));
  },
  set(key, value) { // eslint-disable-line no-unused-vars
    let arrayFirst = A([{ name: '', valuePath: '', selected: true, disabled: false}]);
    return arrayFirst.concat(value);
  }
  })
  selectedColumns;

  @computed("selectedColumns", "pageItems", {
    get() {
      return this.pageItems;
    }
  })
  rows;

  @computed("selectAll", {
    get() {
      if (this.selectAll) {
        return this.rows;
      }
      return A([])
    },
    set(key, value) {
      if (this.selectAll == true) {
        this.set('selectAll', false);
      }
      if (value.length == this.rows.length) {
        this.set('selectAll', true);
      }
      return value;
    }
  })
  selected;

  @action
  onFilterColumns(filteredColumns) {
    if(filteredColumns && filteredColumns.length > 0) {
      //debugger;
      this.set('selectedColumns', filteredColumns);
    }
  }
}

export default Table;