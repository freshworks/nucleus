import {
  tagName,
  layout as templateLayout,
} from '@ember-decorators/component';
import defaultProp from '@freshworks/core/utils/default-decorator';
import { action, computed } from '@ember/object';
import { A } from '@ember/array';
import { set } from '@ember/object';
import Component from '@ember/component';
import layout from "../templates/components/nucleus-table";
import { later } from '@ember/runloop';

/**
  __Usage:__

  [Refer component page](/docs/components/nucleus-table)

  @class Nucleus Table
  @namespace Components
  @extends Ember.Component
  @public
*/
@templateLayout(layout)
@tagName('')
class NucleusTable extends Component {
  @defaultProp
  columns;

  @defaultProp
  rows;

  @defaultProp
  pageSize = 30;

  @defaultProp
  canFilter = true;

  @defaultProp
  selectAll = false;

  @defaultProp
  pageReload = 0;

  @defaultProp
  isMini = false;

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
      return arrayFirst.concat(value);
    }
  })
  selectedColumns;


  /**
  * selectedRows
  *
  * @field selectedRows
  * @type function
  * @private
  */
  @computed("selectedColumns", "rows", {
    get() {
      let allRowsData = this.get('rows');
      let columnValuePaths = this.get('selectedColumns').map(column => column.valuePath);
      return allRowsData;
    },
    set(key, value) { // eslint-disable-line no-unused-vars
      return value;
    }
  })
  selectedRows;

  @defaultProp
  height;


  /**
  * Toggle action to show or hide the stacked notifications.
  *
  * @method onFilterColumns
  * @public
  *
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

export default NucleusTable;
