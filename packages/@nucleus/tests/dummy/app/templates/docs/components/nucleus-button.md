# Button

```sh
yarn add @freshworks/button
```

Buttons are interactive components that the users can click or touch to trigger corresponding business logic. 

## Usage

#### 1. Simplest use case
A button with text in it, telling the user what to do.

{{#docs-demo as |demo|}}
  {{#demo.example name="nucleus-button.hbs"}}
    {{nucleus-button label="Click here"}}
  {{/demo.example}}
  {{demo.snippet 'nucleus-button.hbs'}}
{{/docs-demo}}

#### 2. Block form
Button with yieldable content.

{{#docs-demo as |demo|}}
  {{#demo.example name='nucleus-button-block-form.hbs'}}
    {{#nucleus-button variant="secondary" ariaLabel="concise label"}}
      Some yield content here
    {{/nucleus-button}}
  {{/demo.example}}
  {{demo.snippet 'nucleus-button-block-form.hbs'}}
{{/docs-demo}}

#### 3. Asynchronous Button
Dynamic button which has different states: pending and success. Supply an `action` that returns a `Promise` and watch the magic!

{{nucleus-button/demo-1}}

## Styles

#### 1. Different variants:
{{#docs-demo as |demo|}}
  {{#demo.example name='nucleus-button-light.hbs'}}
    {{nucleus-button label="Click here"}}
    {{nucleus-button label="Click here" variant="secondary"}}
    {{nucleus-button label="Click here" variant="danger"}}
    {{nucleus-button label="Click here" variant="link"}}
    {{nucleus-button label="Click here" variant="text"}}
  {{/demo.example}}
  {{demo.snippet 'nucleus-button-light.hbs'}}
{{/docs-demo}}

#### 2. Different sizes:
{{#docs-demo as |demo|}}
  {{#demo.example name='nucleus-button-tiny.hbs'}}
    {{nucleus-button label="Click here" size="small"}}
    {{nucleus-button label="Click here" size="mini"}}
  {{/demo.example}}
  {{demo.snippet 'nucleus-button-tiny.hbs'}}
{{/docs-demo}}

#### 3. Icon buttons:
It is possible to create buttons that contain only icons with the `iconOnly` attribute. 
The `iconSize` property specifies the size of the icon. If the iconSize is not mentioned, the icon takes the size of the button.

{{#docs-demo as |demo|}}
  {{#demo.example name='nucleus-button-dense.hbs'}}
    {{nucleus-button icon="nucleus-circle-check" iconOnly=true iconSize="medium" 
      variant="text"}}
    {{nucleus-button icon="nucleus-circle-check" iconOnly=true size="small" 
      iconSize="small" variant="text"}}
    {{nucleus-button icon="nucleus-circle-check" iconOnly=true size="mini" 
      iconSize="mini" variant="text"}}
  {{/demo.example}}
  {{demo.snippet 'nucleus-button-dense.hbs'}}
{{/docs-demo}}

{{#docs-demo as |demo|}}
  {{#demo.example name='nucleus-button-icon.hbs'}}
    {{nucleus-button icon="nucleus-circle-check" label="Click here" variant="danger"}}
  {{/demo.example}}
  {{demo.snippet 'nucleus-button-icon.hbs'}}
{{/docs-demo}}

#### 4. Full-width button:
{{#docs-demo as |demo|}}
  {{#demo.example name='nucleus-button-block.hbs'}}
    {{nucleus-button label="Click here" block=true}}
  {{/demo.example}}
  {{demo.snippet 'nucleus-button-block.hbs'}}
{{/docs-demo}}

#### 5. Disabled button
To toggle the 'disabled' property, set 'disabled' to true
{{#docs-demo as |demo|}}
  {{#demo.example name='nucleus-button-disabled.hbs'}}
    {{nucleus-button variant="primary" label="Click here" disabled=true}}
  {{/demo.example}}
  {{demo.snippet 'nucleus-button-disabled.hbs'}}
{{/docs-demo}}

## Guidelines

✅**Do's**

1. Label button with what action it triggers

2. Choose appropriate button for the context

3. Use primary button for the primary/important action of the page.

4. Use secondary buttons as default buttons

5. Use link buttons as tertiary buttons for less prominent actions

6. Use consistent button placement and direction for a user journey

7. Use button against a contrast background and have essential white space around the button


🚫**Dont's**

1. Avoid using too many buttons in one page 

2. Button copy shouldn’t be too wordy

3. Don’t use more than one primary button in a page

4. Don’t use buttons instead of tabs

5. Don’t trigger the action without alerting the user for destructive buttons  

6. Don’t use destructive buttons for all delete/ cancellation scenarios. More applicable for actions which involves deleting the data permanently

7. Don’t enable primary button before all mandatory fields are filled

## Accessibility

Since we're using the native HTML button element and requiring a label value to be provided, the component itself is accesible as it is.

If you are going to put an icon in the button, then you will need to set an aria-label property on the button:
{{#docs-demo as |demo|}}
  {{#demo.example name='nucleus-button-icon-2.hbs'}}
    {{#nucleus-button  ariaLabel="Hamster Secrets" title="Hamster Secrets"}}
      🐹
    {{/nucleus-button}}
  {{/demo.example}}
  {{demo.snippet 'nucleus-button-icon-2.hbs'}}
{{/docs-demo}}

{{docs-note}}
