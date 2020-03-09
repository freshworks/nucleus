import Component from '@ember/component';
import { action, computed, get } from '@ember/object';
import { highlightCode } from 'ember-cli-addon-docs/utils/compile-markdown';
import copyToClipboard from '../../utils/copy-to-clipboard';


class Code extends Component {
  @computed('code')
  get computedCode() {
    return highlightCode(get(this, 'code'), 'hbs');
  }


  @action
  copyCode() {
    copyToClipboard(get(this, 'code'))
        .then(this.flashMessages.success(`Code copied.`));
  }
}

export default Code;