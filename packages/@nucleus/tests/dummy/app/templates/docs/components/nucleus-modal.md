# Modal

```sh
yarn add @freshworks/modal
```

Best use of modals is to get the task quickly done and may also support in completion of the primary task, for example: Creation of an entity and also editing it. Modal has to be relevant and carefully utilized as modal grasp users attention and may obstruct their current flow. 

## Usage

#### 1. Simple Modal

![Modal screenshots](../../images/modal.png)

{{nucleus-modal/demo-1}}

#### 2. Confirm Dialog

![Modal screenshots](../../images/confirm-dialog.png)

{{nucleus-modal/demo-2}}

#### 3. Slider

![Modal screenshots](../../images/slider.png)

{{nucleus-modal/demo-3}}

## Guidelines

✅**Do's**

1. Add scroll to body (CTA to remain fixed) incase the content is more. 

2. Icon to the titles has to be contextual

3. Focus should be on the first item in modal as it opens


🚫**Dont's**

1. Don’t exceed maximum width of 800 px

2. Avoid using 2 levels of modal on modal.

3. Don’t use modal if it is not related to the user’s current taskflow.

4. Avoid modal for complex decision making that requires additional sources of information.

5. Avoid closing the modal on clicking outside for confirmation modals and forms dialogs in which user confirmation or input required.

## Keyboard Support

__Tab__

- Moves focus to next focusable element inside the dialog.
- When focus is on the last focusable element in the dialog, moves focus to the first focusable element in the dialog.

__Shift + Tab__

- Moves focus to previous focusable element inside the dialog.
- When focus is on the first focusable element in the dialog, moves focus to the last focusable element in the dialog.

__Escape__ 

Closes the dialog.


## Accessibility

__role=dialog__

Identifies the element that serves as the dialog container.

__aria-labelledby=IDREF__

Gives the dialog an accessible name by referring to the element that provides the dialog title.

__aria-describedby=IDREF__ (optional)

Gives the dialog an accessible description by referring to the dialog content that describes the primary message or purpose of the dialog.

__aria-modal=true__ 

Tells assistive technologies that the windows underneath the current dialog are not available for interaction (inert).

{{docs-note}}
