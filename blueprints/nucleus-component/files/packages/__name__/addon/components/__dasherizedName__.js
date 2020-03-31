import {
  classNames,
  attributeBindings,
  classNameBindings,
  layout as templateLayout,
} from '@ember-decorators/component';

import Component from '@ember/component';
import layout from "../templates/components/nucleus-<%= name %>";

/**
  __Usage:__

  [Refer component page](/docs/components/nucleus-<%= name %>)

  @class Nucleus <%= capitalizedName %>
  @namespace Components
  @extends Ember.Component
  @public
*/
@templateLayout(layout)
@classNames('nucleus-<%= name %>')
class <%= capitalizedComponentName %> extends Component {

}

export default <%= capitalizedComponentName %>;
