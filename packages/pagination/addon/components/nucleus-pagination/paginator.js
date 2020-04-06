import {
  classNames,
  attributeBindings,
  tagName,
  layout as templateLayout,
} from '@ember-decorators/component';
import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import defaultProp from '@freshworks/core/utils/default-decorator';

import Component from '@ember/component';
import layout from "../../templates/components/nucleus-pagination/paginator";


/**
  @class Nucleus Paginator
  @namespace Components
  @extends Ember.Component
  @public
*/
@templateLayout(layout)
@classNames('nucleus-paginator')
@tagName('nav')
@attributeBindings('dataTestSelector:data-test-selector', '_ariaLabel:aria-label')
class Paginator extends Component {

  /** 
  * Enables the Mini pagination buttons
  *
  * @field mini
  * @type boolean
  * @default false
  * @public
  */
  @defaultProp
  mini = false;

  /** 
  * Show the current set of item numbers for mini pagination
  *
  * @field itemsCount
  * @type boolean
  * @default true
  * @public
  */
  @defaultProp
  itemsCount = true;

  /** 
  * Show / hide page numbers on the Paginator
  *
  * @field hasPageNos
  * @type boolean
  * @default true
  * @public
  */
  @defaultProp
  hasPageNos = true;
  
  /** 
  * Aria Label for the Paginator
  *
  * @field _ariaLabel
  * @type text
  * @private
  */
  @defaultProp
  _ariaLabel = "Page Navigation";
    
  /** 
  * Data Test Selector for the Paginator
  *
  * @field dataTestSelector
  * @type text
  * @private
  */
  @defaultProp
  dataTestSelector = "page-navigation";

  /** 
  * Checks if more pages are present on the page list
  *
  * @computed hasMorePages
  * @type boolean
  * @private
  */
  @computed ('totalPages', 'pages') 
  get hasMorePages() {
    if (this.totalPages === this.pages[this.pages.length-1].number) {
      return false
    }
    else {
      return true
    }
  }

  /** 
  * Checks if there was a previous page on the page list
  *
  * @computed hasPrevPages
  * @type boolean
  * @private
  */
  @computed ('pages')
  get hasPrevPages() {
    if (this.pages[0].number != 1) {
      return true
    }
    else {
      return false
    }
  }

  /** 
  * Computes next visible page on the page list
  *
  * @computed nextVisiblePage
  * @type number
  * @private
  */
  @computed('pages', 'hasMorePages')
  get nextVisiblePage() {
    if (this.hasMorePages) {
      return (this.pages[this.pages.length-1].number + 1)
    }
    else {
      return -1
    }
  }

  /** 
  * Computes previous visible page on the page list
  *
  * @computed prevVisiblePage
  * @type number
  * @private
  */
  @computed('pages', 'hasPrevPages')
  get prevVisiblePage() {
    if (this.hasPrevPages) {
      return (this.pages[0].number - 1)
    }
    else {
      return -1
    }
  }

  /** 
  * Computes page when Previous is clicked
  *
  * @computed prevPageNumber
  * @type number
  * @private
  */
  @computed('currentPage')
  get prevPageNumber() {
    return Math.max(1, this.get('currentPage') - 1);
  }

  /** 
  * Computes page when Next is clicked
  *
  * @computed nextPageNumber
  * @type number
  * @private
  */
  @computed('currentPage')
  get nextPageNumber() {
    return Math.min(this.get('totalPages'), this.get('currentPage') + 1);
  }

  /** 
  * Checks if there is no Previous Page
  *
  * @computed isPrevDisabled
  * @type boolean
  * @private
  */
  @equal('currentPage', 1)
  isPrevDisabled;

  /** 
  * Checks if there is no Next Page
  *
  * @computed isNextDisabled
  * @type boolean
  * @private
  */
  @computed('currentPage', 'totalPages')
    get isNextDisabled() {
      return this.get('currentPage') === this.get('totalPages') ? true : false;
  }

  /** 
  * Checks the end item number for itemsCount
  *
  * @computed endItem
  * @type number
  * @private
  */
  @computed('currentPage', 'pageSize')
  get endItem() {
    let endNumber = this.currentPage * this.pageSize
    return (endNumber < this.recordCount) ? endNumber : this.recordCount
  }
  
  /** 
  * Checks the start item number for itemsCount
  *
  * @computed startItem
  * @type number
  * @private
  */
  @computed('endItem') 
  get startItem() {
    let startNumber = (this.currentPage - 1) * this.pageSize
    return (startNumber + 1)
  }
}

export default Paginator;