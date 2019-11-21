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
    {{#nucleus-button type="primary" ariaLabel="concise label"}}
      Some yield content here
    {{/nucleus-button}}
  {{/demo.example}}
  {{demo.snippet 'nucleus-button-block-form.hbs'}}
{{/docs-demo}}

#### 3. Asynchronous Button
Dynamic button which has different states: pending and success. Supply an `action` that returns a `Promise` and watch the magic!

{{nucleus-button/demo-1}}

## Styles

#### 1. Different types:
{{#docs-demo as |demo|}}
  {{#demo.example name='nucleus-button-light.hbs'}}
    {{nucleus-button label="Click here"}}
    {{nucleus-button label="Click here" type="secondary"}}
    {{nucleus-button label="Click here" type="danger"}}
    {{nucleus-button label="Click here" type="link"}}
    {{nucleus-button label="Click here" type="text"}}
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
{{#docs-demo as |demo|}}
  {{#demo.example name='nucleus-button-dense.hbs'}}
    {{nucleus-button icon="cross" size="small" type="text"}}
    {{nucleus-button icon="cross" size="mini" type="text"}}
  {{/demo.example}}
  {{demo.snippet 'nucleus-button-dense.hbs'}}
{{/docs-demo}}

{{#docs-demo as |demo|}}
  {{#demo.example name='nucleus-button-icon.hbs'}}
    {{nucleus-button icon="cross" label="Click here" type="danger"}}
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
    {{nucleus-button type="primary" label="Click here" disabled=true}}
  {{/demo.example}}
  {{demo.snippet 'nucleus-button-disabled.hbs'}}
{{/docs-demo}}

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
