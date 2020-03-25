# Toggle

```sh
yarn add @freshworks/toggle
```

Description

## Usage

{{#docs-demo as |demo|}}
  {{#demo.example name="nucleus-toggle.hbs"}}
    {{nucleus-toggle}}
  {{/demo.example}}
  {{demo.snippet 'nucleus-toggle.hbs'}}
{{/docs-demo}}

## Playground

{{nucleus-toggle/playground}}

## Guidelines

✅**Do's**

1. Use toggles with labels unless the title is straightforward so the user knows exactly what action he is doing.
2. In case of multiple toggles, align them well so that it is easier to find them on the page.

🚫**Dont's**

1. Do not redirect the user to a different page on change of the toggle state. 
2. Avoid using multiple toggles on the same page, as much as possible.
3. Toggle actions work immediately. Do not enable them only after a clicking confirm button.
