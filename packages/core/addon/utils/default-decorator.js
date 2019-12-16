import { computed } from '@ember/object';

export default function defaultProp(target, key, descriptor) {
  let { initializer, value } = descriptor;

  return computed({
    get() {
      return initializer ? initializer.call(this) : value;
    },
    set(_, v) {
      return v;
    }
  })(target, key, { ...descriptor, value: undefined, initializer: undefined });
}
