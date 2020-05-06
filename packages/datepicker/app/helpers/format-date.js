import { helper as buildHelper } from '@ember/component/helper';
import { formatDate as format } from "ember-power-calendar-utils";

export function formatDate(args) {
  return format(args[0], args[1], args[2]);
}

export default buildHelper(formatDate);
