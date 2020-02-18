import { set } from '@ember/object';

export default function safeSet(context, key, value) {
  if (!context.isDestroyed && !context.isDestroying) {
    set(context, key, value);
  }
}
