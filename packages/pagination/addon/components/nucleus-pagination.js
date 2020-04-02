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
  @defaultProp
  maxPagesInList = 10;

  @defaultProp
  currentPage = 1;

  @defaultProp
  onPageSelect = null;

  @defaultProp
  dataTestSelector = null;

  @defaultProp
  records = null;

  @defaultProp
  pageSize = 30;

  @computed('recordCount', 'pageSize')
  get totalPages() {
    let recordCount = this.get('recordCount'),
        pageSize = this.get('pageSize'),
        currentPage = this.get('currentPage'),
        maxPagesInList = this.get('maxPagesInList');

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

  @computed('recordCount', 'pageSize', 'maxPagesInList')
  get nbrPagesInList() {
    return Math.min(this.get('totalPages'), this.get('maxPagesInList'));
  }

  @computed('currentPage', 'recordCount', 'pageSize', 'maxPagesInList')
  get pages() {
    let pageArray = [],
        totalPages = this.get('totalPages'),
        currentPage = this.get('currentPage'),
        nbrPagesInList = this.get('nbrPagesInList'),
        active, pgNbr, endPgNbr;

    endPgNbr = Math.min((currentPage + 3), totalPages);
    pgNbr = Math.max((endPgNbr - nbrPagesInList + 1), 1);

    for (var i = 0; i < nbrPagesInList; i++) {
      active = pgNbr === currentPage ? true : false;
      pageArray[i] = {number: pgNbr, active: active};
      pgNbr++;
    }
    return pageArray;
  }

  @computed('currentPage', 'recordCount')
  get pageItems() {
    let index = (this.currentPage - 1) * this.pageSize;
    let resultArr = this.records.slice(index, index + this.pageSize)
    return resultArr;
  }

  @action
  getPage(newPageNumber) {
    if (newPageNumber !== this.currentPage) {
      this.currentPage = newPageNumber; 
    }
  }
}

export default NucleusPagination;
