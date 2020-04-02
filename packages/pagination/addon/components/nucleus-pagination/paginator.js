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
  __Usage:__

  [Refer component page](/docs/components/nucleus-pagination)

  @class Nucleus Paginator
  @namespace Components
  @extends Ember.Component
  @public
*/
@templateLayout(layout)
@classNames('nucleus-pagination__paginator')
@tagName('nav')
@attributeBindings('dataTestSelector:data-test-selector', '_ariaLabel:aria-label')
class Paginator extends Component {

  @computed('currentPage')
  get prevPageNumber() {
    return Math.max(1, this.get('currentPage') - 1);
  }

  @computed('currentPage')
  get nextPageNumber() {
    return Math.min(this.get('totalPages'), this.get('currentPage') + 1);
  }
  
  @equal('currentPage', 1)
  isPrevDisabled;
  
  @computed('currentPage', 'totalPages')
    get isNextDisabled() {
      return this.get('currentPage') === this.get('totalPages') ? true : false;
  }

  @defaultProp
  _ariaLabel = "Page Navigation";
      

  @defaultProp
  dataTestSelector = "page-navigation";

}

export default Paginator;