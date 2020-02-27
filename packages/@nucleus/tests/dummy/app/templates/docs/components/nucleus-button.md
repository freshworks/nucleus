# Button

```sh
yarn add @freshworks/button
```

Buttons are interactive components that the users can click or touch to trigger corresponding business logic.

## Usage

{{#docs-demo as |demo|}}
  {{#docs-snippet name="nucleus-button.hbs"}}
    {{nucleus-button label="Click here"}}
  {{/docs-snippet}}
{{/docs-demo}}

## Playground

{{nucleus-button/playground}}

## Usecases

#### 1. Block form
Button with yieldable content.

{{#docs-demo as |demo|}}
  {{#demo.example name='nucleus-button-block-forms.hbs'}}
    {{#nucleus-button variant="secondary" ariaLabel="concise label"}}
      Some yield content here
    {{/nucleus-button}}
  {{/demo.example}}

  {{demo.snippet 'nucleus-button-block-forms.hbs'}}
{{/docs-demo}}

#### 2. Asynchronous Button
Dynamic button which has different states: pending and success. Supply an `action` that returns a `Promise` and watch the magic!

{{nucleus-button/demo-1}}

#### 3. Icon buttons:
It is possible to create buttons that contain only icons with the `iconOnly` attribute.
The `iconSize` property specifies the size of the icon. If the iconSize is not mentioned, the icon takes the size of the button.

{{#docs-demo as |demo|}}
  {{#demo.example name='nucleus-button-dense.hbs'}}
    {{nucleus-button icon="nucleus-circle-check" iconOnly=true iconSize="medium"
      variant="text"}}
    {{nucleus-button icon="nucleus-circle-check" label="Click here" variant="secondary"}}
  {{/demo.example}}

  {{demo.snippet 'nucleus-button-dense.hbs'}}
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
