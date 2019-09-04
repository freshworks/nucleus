

# Modal

## Usage

#### 1. Simple Modal

{{#docs-demo as |demo|}}
  {{#demo.example name="modal-demo-1.hbs"}}
    <button onclick={{action (mut isModal1 true)}} class="docs-btn">
      Click here to open simple modal
    </button>

    {{#if isSubmitSuccess}}
    <p>Next callback success</p>
    {{/if}}
    {{#nucleus-modal open=isModal1 as |modal|}}
      {{modal.header title="Dialog"}}
      {{#modal.body}}Hello world!{{/modal.body}}
      {{modal.footer closeTitle="Ok"}}
    {{/nucleus-modal}}
  {{/demo.example}}

  {{demo.snippet "modal-demo-1-markup.hbs"}}
{{/docs-demo}}

#### 2. Confirm Dialog

{{#docs-demo as |demo|}}
  {{#demo.example name="modal-demo-2.hbs"}}
    <button onclick={{action (mut isModal2 true)}} class="docs-btn">
      Click here to open confirmation dialog
    </button>
    {{#nucleus-confirm-dialog open=isModal2 type="danger" title="Account cancellation" onClose=(action (mut isModal2) false)}}
      <p>Your account will be cancelled in <b>7 days</b> on <b>July 4, 2019</b>. Your account and data will be irrevocably deleted two weeks later.</p>
    {{/nucleus-confirm-dialog}}
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
