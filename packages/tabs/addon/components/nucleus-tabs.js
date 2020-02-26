import {
  classNames,
  attributeBindings,
  classNameBindings,
  layout as templateLayout,
} from '@ember-decorators/component';

import Component from '@ember/component';
import layout from "../templates/components/nucleus-tabs";

/**
  __Usage:__

  [Refer component page](/docs/components/nucleus-tabs)

  @class Nucleus Tab
  @namespace Components
  @extends Ember.Component
  @public
*/
@templateLayout(layout)
@classNames('nucleus-tabs')
@classNameBindings(
  'customClass',
)
@attributeBindings('_label:aria-label', 'autofocus')
class NucleusTabs extends Component {

}

export default NucleusTabs;
