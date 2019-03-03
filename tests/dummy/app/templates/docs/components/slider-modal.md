# Slider modal

Use a slider modal to extend the interface without directing the user to a new page. This is often for a productivity based task that is complex.

## Example

{{docs-snippet name='modals.hbs'}}

## Demo
{{#docs-demo as |demo|}}

{{! BEGIN-SNIPPET modals.hbs }}
  This is a text that contains a <a href="#" {{action (mut showModal) true}}>link</a> that opens the slider modal.

  {{#if showModal}}
    {{#ui-slider-modal onCloseModal=(action (mut showModal) false) as |modal|}}
      {{modal.close}}
      {{#modal.header}}
        Sample Title
      {{/modal.header}}
      {{#modal.body}}
        Body
      {{/modal.body}}
      {{#modal.footer}}
        {{nucleus-button label="Save"}}
      {{/modal.footer}}
    {{/ui-slider-modal}}
  {{/if}}
{{! END-SNIPPET }}

{{/docs-demo}}
