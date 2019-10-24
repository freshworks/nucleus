
# Button

![Button screenshots](../../images/buttons.png)


## Usage

Simplest use case: a button with text in it, telling the user what to do.

{{#docs-demo as |demo|}}
  {{#demo.example name="nucleus-button.hbs"}}
    {{nucleus-button label="Downloads"}}
  {{/demo.example}}
  {{demo.snippet 'nucleus-button.hbs'}}
{{/docs-demo}}

Block form
{{#docs-demo as |demo|}}
  {{#demo.example name='nucleus-button-block-form.hbs'}}
    {{#nucleus-button type="primary" ariaLabel="concise label"}}
      Some yield content here
    {{/nucleus-button}}
  {{/demo.example}}
  {{demo.snippet 'nucleus-button-block-form.hbs'}}
{{/docs-demo}}

Asynchronous Button
{{nucleus-button/demo-1}}

## Styles

Different types:
{{#docs-demo as |demo|}}
  {{#demo.example name='nucleus-button-light.hbs'}}
    {{nucleus-button label="click me"}}
    {{nucleus-button label="click me" type="secondary"}}
    {{nucleus-button label="click me" type="danger"}}
    {{nucleus-button label="click me" type="link"}}
  {{/demo.example}}
  {{demo.snippet 'nucleus-button-light.hbs'}}
{{/docs-demo}}

Smaller button:
{{#docs-demo as |demo|}}
  {{#demo.example name='nucleus-button-tiny.hbs'}}
    {{nucleus-button label="click me" size="mini"}}
  {{/demo.example}}
  {{demo.snippet 'nucleus-button-tiny.hbs'}}
{{/docs-demo}}

Icon buttons:
{{#docs-demo as |demo|}}
  {{#demo.example name='nucleus-button-dense.hbs'}}
    {{nucleus-button icon="cross" size="mini" type="primary"}}
    {{nucleus-button icon="cross" size="mini" type="secondary"}}
    {{nucleus-button icon="cross" size="mini" type="danger"}}
  {{/demo.example}}
  {{demo.snippet 'nucleus-button-dense.hbs'}}
{{/docs-demo}}

Full-width button:
{{#docs-demo as |demo|}}
  {{#demo.example name='nucleus-button-block.hbs'}}
    {{nucleus-button label="click me" block=true}}
  {{/demo.example}}
  {{demo.snippet 'nucleus-button-block.hbs'}}
{{/docs-demo}}

To toggle the 'disabled' property, set 'disabled' to true
{{#docs-demo as |demo|}}
  {{#demo.example name='nucleus-button-disabled.hbs'}}
    {{#nucleus-button type="primary" disabled=true}}
      Downloads
    {{/nucleus-button}}
  {{/demo.example}}
  {{demo.snippet 'nucleus-button-disabled.hbs'}}
{{/docs-demo}}

## Accessibility

Since we're using the native HTML button element and requiring a label value to be provided, the component itself is accesible as it is.

If you are going to put an icon in the button, then you will need to set an aria-label property on the button:
{{#docs-demo as |demo|}}
  {{#demo.example name='nucleus-button-icon.hbs'}}
    {{#nucleus-button  ariaLabel="Hamster Secrets" title="Hamster Secrets"}}
      🐹
    {{/nucleus-button}}
  {{/demo.example}}
  {{demo.snippet 'nucleus-button-icon.hbs'}}
{{/docs-demo}}

## Other Uses

There are some other ways this component could be used:

- as a link
- as a toggle button (supports the aria-pressed attribute)

{{docs-note}}
