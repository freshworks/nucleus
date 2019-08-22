

# Modal

## Usage

#### 1.Simple modal with title and description

{{#docs-demo as |demo|}}
  {{#demo.example name="modal-demo-1.hbs"}}
    <button onclick={{action (mut isShowing true)}} class="docs-btn">
      Click here to open simple modal
    </button>

    {{#if isShowing}}
      {{#nucleus-modal as |modal|}}
        {{modal.header title="Some title"}}
        {{#modal.body}}Some content{{/modal.body}}
        {{modal.footer closeTitle="Close"}}
      {{/nucleus-modal}}
    {{/if}}
  {{/demo.example}}

  {{demo.snippet "modal-demo-1-markup.hbs"}}
{{/docs-demo}}

#### 2.Modal with onClose action

{{#docs-demo as |demo|}}
  {{#demo.example name="modal-demo-2.hbs"}}
    <button onclick={{action (mut isShowing2 true)}} class="docs-btn">
      Click here to open simple modal
    </button>

    {{#if isShowing2}}
      {{#nucleus-confirm-dialog onClose=(action (mut isShowing2 false)) title="Sample title"}}
        Sample body
      {{/nucleus-confirm-dialog}}
    {{/if}}
  {{/demo.example}}

  {{demo.snippet "modal-demo-2-markup.hbs"}}
{{/docs-demo}}

## Styles



## Accessibility

Since we're using the native HTML button element and requiring a label value to be provided, the component itself is accesible as it is.

If you are going to put an icon in the button, then you will need to set an aria-label property on the button:

## Other Uses

There are some other ways this component could be used:

- as a link
- as a toggle button (supports the aria-pressed attribute)

{{docs-note}}
