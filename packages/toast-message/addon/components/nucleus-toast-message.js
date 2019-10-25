import Component from '@ember/component';
import { inject } from '@ember/service';
import layout from '../templates/components/nucleus-toast-message';
 
export default Component.extend({
  layout,
  flashMessages: inject()
});