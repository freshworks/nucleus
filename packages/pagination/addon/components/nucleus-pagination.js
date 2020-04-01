import {
  classNames,
  attributeBindings,
  classNameBindings,
  layout as templateLayout,
} from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import { gt, equal } from '@ember/object/computed';
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
class NucleusPagination extends Component {
  @defaultProp
  maxPagesInList = 10;

  @defaultProp
  pageNumber = 1;

  @defaultProp
  onPageSelect = null;

  @gt('totalPages', 1)
  displayPaginator;

  @equal('pageNumber', 1)
  isPrevDisabled;

  @defaultProp
  dataTestSelector = null;

  @computed('pageNumber', 'totalPages')
  get isNextDisabled() {
    return this.get('pageNumber') === this.get('totalPages') ? true : false;
  }

  @computed('pageNumber')
  get prevPageNumber() {
    return Math.max(1, this.get('pageNumber') - 1);
  }

  @computed('pageNumber')
  get nextPageNumber() {
    return Math.min(this.get('totalPages'), this.get('pageNumber') + 1);
  }

  @computed('recordCount', 'pageSize')
  get totalPages() {
    let recordCount = this.get('recordCount'),
        pageSize = this.get('pageSize'),
        pageNumber = this.get('pageNumber'),
        maxPagesInList = this.get('maxPagesInList');

    if (recordCount < 0 || pageSize < 1 || pageNumber < 1 || maxPagesInList < 2) {
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

  @computed('pageNumber', 'recordCount', 'pageSize', 'maxPagesInList')
  get pages() {
    let pageArray = [],
        totalPages = this.get('totalPages'),
        pageNumber = this.get('pageNumber'),
        nbrPagesInList = this.get('nbrPagesInList'),
        active, pgNbr, endPgNbr;

    endPgNbr = Math.min((pageNumber + 3), totalPages);
    pgNbr = Math.max((endPgNbr - nbrPagesInList + 1), 1);

    for (var i = 0; i < nbrPagesInList; i++) {
      active = pgNbr === pageNumber ? true : false;
      pageArray[i] = {number: pgNbr, active: active};
      pgNbr++;
    }
    return pageArray;
  }

  @action
  getPage(newPageNumber) {
    if (newPageNumber !== this.get('pageNumber')) {
      this.pageNumber = newPageNumber;
      this.get('onPageSelect') && this.get('onPageSelect')(newPageNumber);
    }
  }
}

export default NucleusPagination;
