const DATEPICKER_KEY_CODE = {
  TAB: 9,
  ENTER: 13,
  SPACE: 32,
  END: 35,
  HOME: 36,
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40,
  SHIFT: 16,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  ESC: 27
};

const DATEPICKER_MODAL_SELECTOR = `.nucleus-datepicker-modal__content input, 
  .nucleus-datepicker-modal__content button:not(.ember-power-calendar-day), 
  .nucleus-datepicker-modal__content select:not([disabled]), 
  .nucleus-datepicker-modal__content *[tabIndex="0"]`;

const DATEPICKER_PERMITTED_DATE_FORMATS = [
  'd MMM, yyyy',
  'dd MMM, yyyy',
  'do MMM, yyyy',
  'd MMMM, yyyy',
  'dd MMMM, yyyy',
  'do MMMM, yyyy',
  'd MMM yyyy',
  'dd MMM yyyy',
  'do MMM yyyy',
  'd MMMM yyyy',
  'dd MMMM yyyy',
  'do MMMM yyyy',
  'd-M-yyyy',
  'dd-M-yyyy',
  'dd-MM-yyyy',
  'd/MM/yyyy',
  'd/M/yyyy',
  'dd/M/yyyy',
  'dd/MM/yyyy',
  'd/MM/yyyy'
];

const SUPPORTED_LANGUAGES = [
  'en',
  'pt'
];

export { 
  DATEPICKER_KEY_CODE, 
  DATEPICKER_MODAL_SELECTOR, 
  DATEPICKER_PERMITTED_DATE_FORMATS, 
  SUPPORTED_LANGUAGES
};
