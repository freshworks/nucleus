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
    let arrayFirst = A([{ name: '', valuePath: '', selected: true, disabled: true}]);
    return arrayFirst.concat(this.columns.filterBy('selected'));
  },
  set(key, value) { // eslint-disable-line no-unused-vars
    let arrayFirst = A([{ name: '', valuePath: '', selected: true, disabled: true}]);
    this.set('rows', []);
    return arrayFirst.concat(value);
  }
  })
  selectedColumns;

  @computed("columns", "pageItems", {
    get() {
      return this.pageItems;
    },
    set(key,value) {
      console.log('happening');
      return A([]);
    }
  })
  rows;

  @defaultProp
  selectAll=false;

  @computed("selectAll", {
    get() {
      console.log("in get")
      console.log(this.selectAll);
      if (this.selectAll) {
        return this.rows;
      }
      else {
        return A([])
      }  
    },
    set(key, value) {
      console.log("in set")
      if (this.selectAll == true) {
        this.set('selectAll', false);
      }
      else if (value.length == this.rows.length) {
        this.selectAll = true;
      }
      console.log(this.selectAll);
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
  
  specialCall() {
    this.set('selectAll', true);
  }
}

export default Table;