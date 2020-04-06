import {
  classNames,
  attributeBindings,
  layout as templateLayout,
} from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import defaultProp from '@freshworks/core/utils/default-decorator';

import Component from '@ember/component';
import layout from "../templates/components/nucleus-pagination";

/**
  __Usage:__

  [Refer component page](/docs/components/nucleus-pagination)

  @class Nucleus Pagination
  @namespace Components
  @extends Ember.Component
  @public
*/
@templateLayout(layout)
@classNames('nucleus-pagination')
@attributeBindings('dataTestSelector:data-test-selector')
class NucleusPagination extends Component {

  /**
  * The number of pages shown in the Paginator
  *
  * @field maxPagesInList
  * @type number
  * @default 10
  * @private
  */
  @defaultProp
  maxPagesInList = 10;

  /** 
  * Current Active Page 
  *
  * @field currentPage
  * @type number
  * @default 1
  * @private
  */
  @defaultProp
  currentPage = 1;

  /** 
  * dataTestSelector for Nucleus Pagination
  *
  * @field dataTestSelector
  * @type string
  * @private
  */
  @defaultProp
  dataTestSelector = "nucleus-pagination";

  /** 
  * Array of all records that should be paginated
  *
  * @field records
  * @type array
  * @public
  */
  @defaultProp
  records = null;

  /** 
  * Number of records per page
  *
  * @field pageSize
  * @type number
  * @default 30
  * @public
  */
  @defaultProp
  pageSize = 30;

  /**  
  * Calculates number of records
  *
  * @computed recordCount
  * @type number
  * @private
  */
  @computed('records')
  get recordCount() {
    return this.records.length;
  }

  /**  
  * Total Number of Pages
  *
  * @computed totalPages
  * @type number
  * @private
  */
  @computed('recordCount', 'pageSize')
  get totalPages() {
    let recordCount = this.recordCount,
        pageSize = this.pageSize,
        currentPage = this.currentPage,
        maxPagesInList = this.maxPagesInList;

    if (recordCount < 0 || pageSize < 1 || currentPage < 1 || maxPagesInList < 2) {
      return 0;
    }

    let totalPages = Math.floor(recordCount/pageSize),
        rem = recordCount % pageSize;

    if (rem > 0) {
      totalPages++;
    }

    return totalPages;
  }

  /**  
  * Array of currently visible page numbers in Paginator
  *
  * @computed pages
  * @type array
  * @private
  */
  @computed('currentPage', 'recordCount', 'pageSize', 'maxPagesInList')
  get pages() {
    let pageArray = [],
        totalPages = this.totalPages,
        currentPage = this.currentPage,
        nbrPagesInList = Math.min(this.totalPages, this.maxPagesInList),
        active, pgNbr, endPgNbr;

    endPgNbr = Math.min((currentPage + 3), totalPages);
    if (endPgNbr + 1 === totalPages) {
      endPgNbr = totalPages
    }
    pgNbr = Math.max((endPgNbr - nbrPagesInList + 1), 1);
    if (pgNbr === 2) {
      pgNbr = 1
    }

    if (endPgNbr != totalPages) {
      if (pgNbr != 1) {
        nbrPagesInList -= 2
      }
      else {
        nbrPagesInList -= 1
      }
    }

    for (var i = 0; i < nbrPagesInList; i++) {
      active = pgNbr === currentPage ? true : false;
      pageArray[i] = {number: pgNbr, active: active};
      pgNbr++;
    }
     
    return pageArray;
  }

  /**  
  * Computes the array of records to be displayed on page
  *
  * @computed pageItems
  * @type array
  * @private
  */
  @computed('currentPage', 'recordCount')
  get pageItems() {
    let index = (this.currentPage - 1) * this.pageSize;
    let resultArr = this.records.slice(index, index + this.pageSize)
    return resultArr;
  }

  /**  
  * Calculates number of records
  *
  * @action getPage
  * @private
  */
  @action
  getPage(newPageNumber) {
    if (newPageNumber !== this.currentPage) {
      this.currentPage = newPageNumber; 
    }
  }
}

export default NucleusPagination;
