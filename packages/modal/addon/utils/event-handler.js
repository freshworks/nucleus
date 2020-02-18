import { isPresent } from '@ember/utils';

export default {
  bindEvent({ context = this, eventName, callback, element } = {}) {
    let eventCallback = callback.bind(context);
    let domElement = isPresent(element) ? document.querySelector(element) : document;
    
    if(isPresent(domElement)) {
      domElement.addEventListener(eventName, eventCallback);
    }

    return eventCallback;
  },
  unbindEvent({ eventName, callback, element } = {}) {
    let domElement = isPresent(element) ? document.querySelector(element) : document;
  
    if(isPresent(domElement)) {
      domElement.removeEventListener(eventName, callback);
    }
  }
}

