
# Button

## Usage

Simplest use case: a button with text in it, telling the user what to do.

{{#docs-demo as |demo|}}
  {{#demo.example name="nucleus-button.hbs"}}
    {{nucleus-button type="primary" label="Downloads"}}
  {{/demo.example}}
  {{demo.snippet 'nucleus-button.hbs'}}
{{/docs-demo}}


Also supported- block use:
{{#docs-demo as |demo|}}
  {{#demo.example name='nucleus-button-has-block.hbs'}}
    {{#nucleus-button type="secondary"}}
      click me <span>🐹</span>
    {{/nucleus-button}}
  {{/demo.example}}
  {{demo.snippet 'nucleus-button-has-block.hbs'}}
{{/docs-demo}}

To toggle the 'disabled' property, set 'isDisabled' to true
{{#docs-demo as |demo|}}
  {{#demo.example name='nucleus-button-disabled.hbs'}}
    {{#nucleus-button type="danger" disabled=true}}
      Downloads
    {{/nucleus-button}}
  {{/demo.example}}
  {{demo.snippet 'nucleus-button-disabled.hbs'}}
{{/docs-demo}}

## Styles

Outline button style:
{{#docs-demo as |demo|}}
  {{#demo.example name='nucleus-button-light.hbs'}}
    {{nucleus-button label="click me" type="transparent"}}
  {{/demo.example}}
  {{demo.snippet 'nucleus-button-light.hbs'}}
{{/docs-demo}}

Smaller button:
{{#docs-demo as |demo|}}
  {{#demo.example name='nucleus-button-tiny.hbs'}}
    {{nucleus-button label="click me" isTiny=true}}
  {{/demo.example}}
  {{demo.snippet 'nucleus-button-tiny.hbs'}}
{{/docs-demo}}

Less Padding:
{{#docs-demo as |demo|}}
  {{#demo.example name='nucleus-button-dense.hbs'}}
    {{nucleus-button label="click me" isDark=true isDense=true}}
  {{/demo.example}}
  {{demo.snippet 'nucleus-button-dense.hbs'}}
{{/docs-demo}}

Full-width button:
{{#docs-demo as |demo|}}
  {{#demo.example name='nucleus-button-block.hbs'}}
    {{nucleus-button label="click me" isBlock=true}}
  {{/demo.example}}
  {{demo.snippet 'nucleus-button-block.hbs'}}
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
