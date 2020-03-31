@freshworks/modal
==============================================================================
[![npm version](https://badge.fury.io/js/%40freshworks%2Fmodal.svg)](https://www.npmjs.com/package/@freshworks/modal)
![npm](https://img.shields.io/npm/dm/@freshworks/modal)

```
ember install @freshworks/modal
```

Modals are an interactive component which appears on top of the page that stops any other interaction behind it. It has a focused task with few components within it like CTAs. Modals requires the users to critically respond to it in order to get back to primary task.

Scenario
------------------------------------------------------------------------------
Best use of modals is to get the task quickly done and may also support in completion of the primary task, for example: Creation of an entity and also editing it. Modal has to be relevant and carefully utilized as modal grasp users attention and may obstruct their current flow. 

Guidelines
------------------------------------------------------------------------------
**DO’s**

1. Add scroll to body (CTA to remain fixed) incase the content is more. 
2. Icon to the titles has to be contextual
3. Focus should be on the first item in modal as it opens

**DONT’s**

1. Don’t exceed maximum width of 800 px
2. Avoid using 2 levels of modal on modal.
3. Don’t use modal if it is not related to the user’s current taskflow.
4. Avoid modal for complex decision making that requires additional sources of information.
5. Avoid closing the modal on clicking outside for confirmation modals and forms dialogs in which user confirmation or input required.
