# Toast Message

```sh
yarn add @freshworks/toast-message
```

Use toast messages for confirmation of delete actions, creating new objects (eg. tickets, groups) etc. Toast messages are used so that they don’t completely disrupt the user’s workflow but alert them anyway.

## Usage
Add `{{nucleus-toast-message}}` to your __application.hbs__.

{{nucleus-toast-message/demo-1}}

## Guidelines

✅**Do's**

1. Keep the message short and to the point

2. Icon to the titles has to be contextual


🚫**Dont's**

1. Don’t have more than two lines of content

2. Don’t use toast messages on overlays (sliders/modals)

3. Don’t use toast messages for high priority information

{{docs-note}}
