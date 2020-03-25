@freshworks/toggle
==============================================================================

```
yarn add @freshworks/toggle
```

Toggles in Freshdesk
------------------------------------------------------------------------------
Interactive component that allows to toggle between two choices, checked and unchecked. They are mostly used to represent active/inactive state.

Accessibility
------------------------------------------------------------------------------
When the toggle has focus, pressing the Space key changes the state of the toggle.

Variants
------------------------------------------------------------------------------
Disabled - Prevent hover states from activating

Guidelines
------------------------------------------------------------------------------
**DO’s**

1. Use toggles with labels unless the title is straightforward so the user knows exactly what action he is doing.
2. In case of multiple toggles, align them well so that it is easier to find them on the page.

**DONT’s**

1. Do not redirect the user to a different page on change of the toggle state. 
2. Avoid using multiple toggles on the same page, as much as possible.
3. Toggle actions work immediately. Do not enable them only after a clicking confirm button.
