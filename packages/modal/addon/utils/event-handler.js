/**
 * Binds the given callback with context to 'eventName' on the element / document and returns the reference.
 * 
 ```js
  import Component from '@ember/component';
  import EventHandler from '@freshworks/modal/utils/event-handler';
  export default Component.extend({
    state: null,
    action: {
      setFocusListener() {
        let _focusListener = EventHandler.bindEvent({
          context: this, 
          eventName: 'focusin',
          callback: this.loopFocus
        });
        set(this, '_focusListener', _focusListener);
      }
    }
  });
```
  *
  * @function bindEvent
  * @public
  * @param {string} eventName Name of the event to bind the callback to
  * @param {function} callback Callback function for the eventhandler 
  * @param {string} element element selector. Defaults to document 
  * @return {function} Returns the reference of the callback binded
*/
function bindEvent({ eventName, callback, element } = {}) {
  let domElement = element ? document.querySelector(element) : document;
  
  if(domElement) {
    domElement.addEventListener(eventName, callback);
  }

  return callback;
}

/**
 * Unbinds the given callback from 'eventName' on the element / document.
 ```js
  import Component from '@ember/component';
  import EventHandler from '@freshworks/modal/utils/event-handler';
  export default Component.extend({
    state: null,
    action: {
      setFocusListener() {
        let _focusListener = EventHandler.unbindEvent({
          eventName: 'focusin',
          callback: this.loopFocus
        });
        set(this, '_focusListener', _focusListener);
      }
    }
  });
  ```
  *
  * @function unbindEvent
  * @public
  * @param {string} eventName Name of the event to bind the callback to
  * @param {function} callback Callback function for the eventhandler 
  * @param {string} element element selector. Defaults to document 
*/
function unbindEvent({ eventName, callback, element } = {}) {
  let domElement = element ? document.querySelector(element) : document;

  if(domElement) {
    domElement.removeEventListener(eventName, callback);
  }
}

export {
  unbindEvent,
  bindEvent
}