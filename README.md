Nucleus - The Freshworks Design System in Ember
==============================================================================
![Build](https://github.com/freshdesk/nucleus/workflows/Build/badge.svg?branch=master)
![npm (scoped with tag)](https://img.shields.io/npm/v/@freshworks/button/latest)
![npm (scoped with tag)](https://img.shields.io/npm/v/@freshworks/button/beta)

This is the repository of the Freshworks Component Library based on the unified
Freshworks Design Language
https://freshworks.invisionapp.com/dsm/freshworks/d-labs-design-system

Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
npm install @freshworks/[PACKAGE_NAME]
```

```
ember install @freshworks/[PACKAGE_NAME]
```


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

