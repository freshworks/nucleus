import Mixin from '@ember/object/mixin';
import { get, set } from '@ember/object';

export default Mixin.create({
  onScroll: null,
  domElement: null,
  // Not using Ember run.debounce since it returns an `Array` but we need a `function` for event binding.
  debounce: function(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  },

  bindScrolling: function(element) {
    let onScrollFn;
    element && set(this, 'domElement', document.querySelector(element))

    onScrollFn = () => { 
        return this.scrolled(); 
    };
    set(this, 'onScroll', this.debounce(onScrollFn, 100, true));
    
    let scrollElement = get(this, 'domElement');
    scrollElement && scrollElement.addEventListener('scroll', get(this, 'onScroll'));
  },

  unbindScrolling: function() {
    let scrollElement = get(this, 'domElement');
    scrollElement && scrollElement.removeEventListener('scroll', get(this, 'onScroll'));
  }
});