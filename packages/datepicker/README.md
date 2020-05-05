@freshworks/datepicker
==============================================================================

```
yarn add @freshworks/datepicker
```

The date and time picker can be used for both picking date and time as well as selecting one value or picking a range as per the context of usage.


Scenario
------------------------------------------------------------------------------

For each usage varying from selecting one date to selecting a range, the date and time picker must be such designed. Best practices are providing easily accessible buttons for most used components, such as today, yesterday.


Guidelines
------------------------------------------------------------------------------

**Do's**

1. Provide clear visual hue for hover states over the dates.  

**Dont's**

1. If the date to be selected is far away in time, providing a date and time picker is a bad practice. Then get input from textbox.


Internationalization
------------------------------------------------------------------------------

Supports calendar localization for languages that date-fns supports. For supported languages, 
https://date-fns.org/v2.11.1/docs/I18n .

For other strings, we use ember-intl addons. Currently only supports only 'en' and 'pt' for the moment. 
https://ember-intl.github.io/ember-intl/docs/guide/supported-locales .
