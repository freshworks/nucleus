

# Modal

## Usage

#### 1.Simple modal with title and description

{{#docs-demo as |demo|}}
  {{#demo.example name="modal-demo-1.hbs"}}
    <button onclick={{action (mut isModal1 true)}} class="docs-btn">
      Click here to open simple modal
    </button>

    {{#if isSubmitSuccess}}
    <p>Submit success</p>
    {{/if}}
    {{#nucleus-modal open=isModal1 onClose=(action (mut isModal1) false) onSubmit=(action (mut isSubmitSuccess) true) as |modal|}}
      {{modal.header title="Some title" closeButton=true}}
      {{#modal.body}}Some content{{/modal.body}}
      {{modal.footer submitTitle="Submit" closeTitle="Close"}}
    {{/nucleus-modal}}
  {{/demo.example}}

  {{demo.snippet "modal-demo-1-markup.hbs"}}
{{/docs-demo}}

#### 2.Modal with onClose action

{{#docs-demo as |demo|}}
  {{#demo.example name="modal-demo-2.hbs"}}
    <button onclick={{action (mut isModal2 true)}} class="docs-btn">
      Click here to open confirmation dialog
    </button>
    {{#nucleus-confirm-dialog open=isModal2 title="Confirm dialog title" onClose=(action (mut isModal2) false)}}
      Are you sure?
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
