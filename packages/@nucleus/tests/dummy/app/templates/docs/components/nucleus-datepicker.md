# Datepicker

```sh
yarn add @freshworks/datepicker
```

## Description

The date and time picker can be used for both picking date and time as well as selecting one value or picking a range as per the context of usage.


## Scenario

For each usage varying from selecting one date to selecting a range, the date and time picker must be such designed. Best practices are providing easily accessible buttons for most used components, such as today, yesterday.


## Usage

#### 1. Calendar with date only

{{nucleus-datepicker/demo-1}}



#### 2. Calendar with input field

{{nucleus-datepicker/demo-2}}



#### 3. Calendar range selection

{{nucleus-datepicker/demo-3}}



#### 4. Calendar with input field- range selection

{{nucleus-datepicker/demo-4}}


#### 5. Internationalization

{{nucleus-datepicker/demo-5}}



## Guidelines

✅**Do's**

1. Provide clear visual hue for hover states over the dates.  

🚫**Dont's**

1. If the date to be selected is far away in time, providing a date and time picker is a bad practice. Then get input from textbox.


## Accessibility

### Date Grid

__role=grid__

Identifies the table element as a grid widget.

__aria-label=IDREF__

Defines the accessible name for the grid using the h2 that shows the month and year of the dates displayed in the grid.

__tabindex="0"__

Makes the button focusable and includes it in the dialog Tab sequence.

__tabindex="-1"__

Makes the button focusable and excludes it from the dialog Tab sequence.

__aria-selected="true"__

Identifies the button for the currently selected date, i.e., the date value present in the date input.
