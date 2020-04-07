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
@attributeBindings('data-test-nucleus-pagination')
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
  * data-test-nucleus-pagination
  *
  * @field data-test-nucleus-pagination
  * @type boolean
  * @private
  */
  @defaultProp
  'data-test-nucleus-pagination' = true;

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
        active, pageNo, endPage;

    endPage = Math.min((currentPage + 3), totalPages);
    if (endPage + 1 === totalPages) {
      endPage = totalPages
    }
    pageNo = Math.max((endPage - nbrPagesInList + 1), 1);
    if (pageNo === 2) {
      pageNo = 1
    }

    if (endPage != totalPages) {
      if (pageNo != 1) {
        nbrPagesInList -= 2
      }
      else {
        nbrPagesInList -= 1
      }
    }

    for (var i = 0; i < nbrPagesInList; i++) {
      active = pageNo === currentPage ? true : false;
      pageArray[i] = {number: pageNo, active: active};
      pageNo++;
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
