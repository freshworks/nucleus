# Tabs

```sh
yarn add @freshworks/tabs
```

Tabs are used to organise content under each section. Tabs are most helpful when there is a lot of content to show in a page. Tabs can help in showing content which are under the same level of hierarchy, under each section inside the same page.

## Usage

#### 1. Categorisation

It's easy for the user to quickly distinguish which tab belongs to which content.

{{#docs-demo as |demo|}}
  {{#demo.example name="nucleus-tabs.hbs"}}
    {{nucleus-tabs}}
  {{/demo.example}}
  {{demo.snippet 'nucleus-tabs.hbs'}}
{{/docs-demo}}


## Guidelines

✅**Do's**

1. Tabs should be placed in a single row over the content

2. Include all interactive states for the tabs


🚫**Dont's**

1. Dont use tabs for sequential content. Users can navigate to any tab at any time and cannot be expected to do it sequentially.

## Accessibility

__role=tablist__

Indicates that the element serves as a container for a set of tabs.

__aria-label=Entertainment__

Provides a label that describes the purpose of the set of tabs.


__role=tab__

Indicates the element serves as a tab control.

__aria-selected=true__

Indicates the tab control is activated and its associated panel is displayed.

__aria-selected=false__

Indicates the tab control is not active and its associated panel is NOT displayed.

__aria-controls=IDREF__

Refers to the tabpanel element associated with the tab.


__role=tabpanel__

Indicates the element serves as a container for tab panel content.

__aria-labelledby=IDREF__ 

Refers to the tab element that controls the panel.

{{docs-note}}