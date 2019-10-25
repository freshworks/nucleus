/* eslint-disable */
import Mixin from '@ember/object/mixin';
import { get, set } from '@ember/object';

export default Mixin.create({
  onScroll: null,
  domElement: null,

  bindScrolling: function(element) {
    let onScrollFn;
    element && set(this, 'domElement', document.querySelector(element))

    onScrollFn = () => { 
        return this.scrolled(); 
    };
    set(this, 'onScroll', onScrollFn);

    let scrollElement = get(this, 'domElement');
    scrollElement && scrollElement.addEventListener('scroll', get(this, 'onScroll'));
  },

  unbindScrolling: function() {
    let scrollElement = get(this, 'domElement');
    scrollElement && scrollElement.removeEventListener('scroll', get(this, 'onScroll'));
  }
});