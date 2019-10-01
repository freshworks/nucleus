

# Modal

Modal is a window overlaid on either the primary window or another dialog window. Windows under a modal dialog are inert. That is, users cannot interact with content outside an active dialog window. Inert content outside an active dialog is typically visually obscured or dimmed so it is difficult to discern, and in some implementations, attempts to interact with the inert content cause the dialog to close.

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
