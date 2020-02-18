import { isPresent } from '@ember/utils';

export function bindEvent(context, eventName, callback, element) {
  let eventCallback = callback.bind(context);
  let domElement = isPresent(element) ? document.querySelector(element) : document;

  domElement && domElement.addEventListener(eventName, eventCallback);

  return eventCallback;
}

export function unbindEvent(eventName, callback, element) {
  let domElement = isPresent(element) ? document.querySelector(element) : document;
  domElement && domElement.removeEventListener(eventName, callback);
}
