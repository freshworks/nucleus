Nucleus - The Freshworks Design System in Ember
==============================================================================
![Build](https://github.com/freshdesk/nucleus/workflows/Build/badge.svg?branch=master)

This is the repository of the Freshworks Component Library based on the unified
Freshworks Design Language
https://freshworks.invisionapp.com/dsm/freshworks/d-labs-design-system

Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.18 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install @freshworks/[PACKAGE_NAME]
```

| Package     | Latest        |
| ------------|:-------------:|
| banner      | [![npm version](https://badge.fury.io/js/%40freshworks%2Fbanner.svg)](https://www.npmjs.com/package/@freshworks/banner) |
| button      | [![npm version](https://badge.fury.io/js/%40freshworks%2Fbutton.svg)](https://www.npmjs.com/package/@freshworks/button)      |
| core        | [![npm version](https://badge.fury.io/js/%40freshworks%2Fcore.svg)](https://www.npmjs.com/package/@freshworks/core)      |
| icon        | [![npm version](https://badge.fury.io/js/%40freshworks%2Ficon.svg)](https://www.npmjs.com/package/@freshworks/icon)      |
| inline-banner        | [![npm version](https://badge.fury.io/js/%40freshworks%2Finline-banner.svg)](https://www.npmjs.com/package/@freshworks/inline-banner)      |
| modal        | [![npm version](https://badge.fury.io/js/%40freshworks%2Fmodal.svg)](https://www.npmjs.com/package/@freshworks/modal)      |
| tabs        | [![npm version](https://badge.fury.io/js/%40freshworks%2Ftabs.svg)](https://www.npmjs.com/package/@freshworks/tabs)      |
| toast-message        | [![npm version](https://badge.fury.io/js/%40freshworks%2Ftoast-message.svg)](https://www.npmjs.com/package/@freshworks/toast-message)      |
| toggle        | [![npm version](https://badge.fury.io/js/%40freshworks%2Ftoggle.svg)](https://www.npmjs.com/package/@freshworks/toggle)      |


Usage
------------------------------------------------------------------------------

See the packages directory for a list of [packages](packages/) that can be installed individually.


To create a new component
------------------------------------------------------------------------------
```
ember g nucleus-component component-name -description="Sample description"
```

- This will take care of creating the necessary files and folders for the new component.
- Will create a basic readme file for the component.
- Will create a dummy documentation page.
- Will add a route for the created documentation page.

#### To get started with the newly created component,
- Go to the the newly created component's folder
```
yarn link
```
- Then copy the component name that is displayed in the terminal
- Go to 'packages/@nucleus' folder
```
yarn link 'copied-component-name'
```
- From the root directory
```
npm run start
```
- You should be able to see the newly created component in the local documentation site.


Contribution guidelines
------------------------------------------------------------------------------

[Contribution guidelines for this project](docs/CONTRIBUTING.md)


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).

