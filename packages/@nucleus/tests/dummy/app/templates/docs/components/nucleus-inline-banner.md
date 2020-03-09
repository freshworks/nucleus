# Inline Banner

```sh
yarn add @freshworks/inline-banner
```

Inline messages are those which stay in the screen for a limited period of time and leave with no or minimal user interaction. It provides additional information to the context of the page.

## Usage

{{#docs-demo as |demo|}}
  {{#docs-snippet name="nucleus-inline-banners.hbs"}}
    {{nucleus-inline-banner
      type="warning"
      title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      onClose=(action "onClose")
    }}
  {{/docs-snippet}}
{{/docs-demo}}


## Playground

{{nucleus-inline-banner/playground}}

## Usecases

#### 1.Custom content

{{nucleus-inline-banner/demo-2}}

## Guidelines

✅**Do's**

1. When used in a form, in-line messages are used at the bottom before the CTA button. However, based on the content, it can be placed above as well.

2. Follow the character limit guidelines mentioned in Typography.

🚫**Dont's**

1. Do not include buttons in an in-line message.

2. Do not include many user interactions in an in-line message.

3. Do not block the user flow. It should only be a notification component and not ask for mandatory user interactions.

{{docs-note}}
