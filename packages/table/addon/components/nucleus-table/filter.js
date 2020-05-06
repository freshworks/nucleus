import {
  tagName,
  layout as templateLayout,
} from '@ember-decorators/component';
import defaultProp from '@freshworks/core/utils/default-decorator';
import { action, computed, set } from '@ember/object';
import { A } from '@ember/array';
import Component from '@ember/component';
import layout from "../../templates/components/nucleus-table/filter";

/**
  __Usage:__

  [Refer component page](/docs/components/nucleus-table)

  The contextual component that provides options to Filter and Select Columns for the Table Display

  @class Filter 
  @namespace Components
  @extends Ember.Component
  @public
*/
@templateLayout(layout)
@tagName('')
class NucleusTableFilter extends Component {

  /**
  * Show / hide the filters dialog   
  *
  * @field showFilters
  * @type boolean
  * @default false
  * @private
  */
  @defaultProp
  showFilters = false;

  /**
  * The array of columns to be reordered and selected   
  *
  * @field columns
  * @type array
  * @private
  */
  @defaultProp
  columns;

  /**
  * Holds the columns initial value   
  *
  * @field _columns
  * @type array
  * @private
  */
  @defaultProp
  _columns;

  didInsertElement() {
    super.didInsertElement();
    let deepCopyArray = A(JSON.parse(JSON.stringify(this.columns)))
    this.set('_columns', deepCopyArray);
  }

  /**
  * Holds the array of selected columns    
  *
  * @computed selectedColumns
  * @type array
  * @private
  */
  @computed('_columns.@each.selected', {
    get() {
      let columns = this.get('_columns');
      return columns.filterBy('selected');
    },
    set(key, value) {
      return value;
    }
  })
  selectedColumns;

  /**
  * Toggles the appearance of the filters dialog    
  *
  * @action toggleFilters
  * @private
  */
  @action
  toggleFilters() {
    this.toggleProperty('showFilters');
  }

  /**
  * Function that handles the selection of columns    
  *
  * @action clickColumn
  * @private
  */
  @action
  clickColumn(column) {
    let columns = this.get('_columns');
    columns.forEach((currentColumn) => {
      if(currentColumn.name === column.name) {
        set(currentColumn, 'selected', !currentColumn.selected);
      }
    });
    this.set('_columns', columns);
  }

  /**
  * Function that handles updation of selected columns in parent component    
  *
  * @action onFilterUpdate
  * @private
  */
  @action
  onFilterUpdate() {
    let selectedColumns = this.get('selectedColumns');
    this.get('onUpdate') && this.get('onUpdate')(selectedColumns);
    this.toggleFilters();
  }

  /**
  * Function that handles reset logic    
  *
  * @action onReset
  * @private
  */
  @action
  onReset() {
    let deepCopyArray = A(JSON.parse(JSON.stringify(this.columns)));
    this.set('_columns', deepCopyArray);
    // this.set('columns', allColumns);
  }
}

export default NucleusTableFilter;
