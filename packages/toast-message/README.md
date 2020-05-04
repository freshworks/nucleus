@freshworks/toast-message
==============================================================================
[![npm version](https://badge.fury.io/js/%40freshworks%2Ftoast-message.svg)](https://www.npmjs.com/package/@freshworks/toast-message)
![npm](https://img.shields.io/npm/dm/@freshworks/toast-message)

```sh
ember install @freshworks/toast-message
```

Toast messages are quick messages that appear after user-driven events to inform the users immediately after said events. These components are mostly used for confirmation or alerts and only require the user’s attention for a span of a few seconds. They can also be closed with the standard close button and may contain buttons or links.

Scenario
------------------------------------------------------------------------------
In Freshdesk, we use toast messages for confirmation of delete actions, creating new objects (eg. tickets, groups) etc. Toast messages are used so that they don’t completely disrupt the user’s workflow but alert them anyway.

Guidelines
------------------------------------------------------------------------------
**DO’s**

1. Keep the message short and to the point
2. Icon to the titles has to be contextual

**DONT’s**

1. Don’t have more than two lines of content
2. Don’t use toast messages on overlays (sliders/modals)
3. Don’t use toast messages for high priority information
