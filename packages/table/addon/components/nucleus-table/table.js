import {
  tagName,
  layout as templateLayout,
} from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import { A } from '@ember/array';
import Component from '@ember/component';
import layout from "../../templates/components/nucleus-table/table";
import { later } from '@ember/runloop';

/**
  __Usage:__

  [Refer component page](/docs/components/nucleus-table)

  The contextual component that displays the actual Table

  @class Table
  @namespace Components
  @extends Ember.Component
  @public
*/
@templateLayout(layout)
@tagName('')
class Table extends Component {

  /**
  * Array of columns displayed on the table
  *
  * @computed selectedColumns
  * @private
  */
  @computed("columns", {
  get() {
    let arrayFirst = A([{ name: '', valuePath: '', selected: true, disabled: true}]);
    return arrayFirst.concat(this.columns.filterBy('selected'));
  },
  set(key, value) { 
    let arrayFirst = A([{ name: '', valuePath: '', selected: true, disabled: true}]);
    return arrayFirst.concat(value);
  }
  })
  selectedColumns;

  /**
  * Array of rows displayed on the table
  *
  * @computed rows
  * @private
  */
  @computed("columns", "pageItems", {
    get() {
      return this.pageItems;
    }
  })
  rows;

  /**
  * Holds the array of selected rows
  *
  * @computed selected
  * @private
  */
  @computed("selectAll", {
    get() {
      if (this.selectAll) {
        return this.rows;
      }
      else {
        return A([])
      }  
    },
    set(key, value) {
      if (this.selectAll == true) {
        this.set('selectAll', false);
      }
      else if (value.length == this.rows.length) {
        this.set('selectAll', true);
      }
      return value;
    }
  })
  selected;

  /**
  * Handles filter of columns 
  *
  * @action onFilterColumns
  * @private
  */
  @action
  onFilterColumns(filteredColumns) {
    if(filteredColumns && filteredColumns.length > 0) {
      this.set('selectedColumns', []);
      later(this, function () {
        this.set('selectedColumns', filteredColumns);
      });
    }
  }
}

export default Table;