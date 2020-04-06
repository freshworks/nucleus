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
    {{#nucleus-tabs 
        customClasses="sample-tab sample-tab-simple"
        description="site-navigation" 
        select="I want apples" 
        variant="line" as |tabs| }}
      {{#tabs.panel name="I want apples" testId="I want apples" }}
        <div>This is apples section</div>
      {{/tabs.panel}}
      {{#tabs.panel name="I want oranges" testId="I want oranges" }}
        <div>This is oranges section</div>
      {{/tabs.panel}}
      {{#tabs.panel name="I want grapes" testId="I want grapes" }}
        <div>This is grapes section</div>
      {{/tabs.panel}}
    {{/nucleus-tabs}}
  {{/demo.example}}
  {{demo.snippet 'nucleus-tabs.hbs'}}
{{/docs-demo}}

#### 2. Custom action 'on' changing tab

{{nucleus-tabs/demo-1}}

#### 3. Custom action 'before' changing tab

{{nucleus-tabs/demo-2}}

#### 4. Disabled tab

{{#docs-demo as |demo|}}
  {{#demo.example name="nucleus-tabs-4.hbs"}}
    {{#nucleus-tabs 
        description="site-navigation" 
        variant="line" as |tabs| }}
      {{#tabs.panel name="I want apples" }}
        <div>This is apples section</div>
      {{/tabs.panel}}
      {{#tabs.panel name="I want oranges" }}
        <div>This is oranges section</div>
      {{/tabs.panel}}
      {{#tabs.panel name="I want grapes" disabled=true }}
        <div>This is grapes section</div>
      {{/tabs.panel}}
    {{/nucleus-tabs}}
  {{/demo.example}}
  {{demo.snippet 'nucleus-tabs-4.hbs'}}
{{/docs-demo}}

## Styles

#### 1. Default 

{{#docs-demo as |demo|}}
  {{#demo.example name="nucleus-tabs-variant1.hbs"}}
    {{#nucleus-tabs 
        description="site-navigation" 
        select="I want apples" 
        variant="line" as |tabs| }}
      {{#tabs.panel name="I want apples" }}
        <div>This is apples section</div>
      {{/tabs.panel}}
      {{#tabs.panel name="I want oranges" }}
        <div>This is oranges section</div>
      {{/tabs.panel}}
      {{#tabs.panel name="I want grapes" }}
        <div>This is grapes section</div>
      {{/tabs.panel}}
    {{/nucleus-tabs}}
  {{/demo.example}}
  {{demo.snippet 'nucleus-tabs-variant1.hbs'}}
{{/docs-demo}}



#### 2. With Background 
Pass 'variant' property as 'background'.

{{#docs-demo as |demo|}}
  {{#demo.example name="nucleus-tabs-variant2.hbs"}}
    {{#nucleus-tabs 
        description="site-navigation" 
        select="I want apples" 
        variant="background" as |tabs| }}
      {{#tabs.panel name="I want apples" }}
        <div>This is apples section</div>
      {{/tabs.panel}}
      {{#tabs.panel name="I want oranges" }}
        <div>This is oranges section</div>
      {{/tabs.panel}}
      {{#tabs.panel name="I want grapes" }}
        <div>This is grapes section</div>
      {{/tabs.panel}}
    {{/nucleus-tabs}}
  {{/demo.example}}
  {{demo.snippet 'nucleus-tabs-variant2.hbs'}}
{{/docs-demo}}


## Guidelines

✅ **Do's**

1. Tabs should be placed in a single row over the content

2. Include all interactive states for the tabs


🚫 **Dont's**

1. Dont use tabs for sequential content. Users can navigate to any tab at any time and cannot be expected to do it sequentially.

2. Dont use tabs for content in different levels of hierarchy.

## Accessibility

__role=tablist__

Indicates that the element serves as a container for a set of tabs.

__aria-label=Entertainment__

Provides a label that describes the purpose of the set of tabs.


__role=tab__

Indicates the element serves as a tab control.

__aria-select=true__

Indicates the tab control is activated and its associated panel is displayed.

__aria-select=false__

Indicates the tab control is not active and its associated panel is NOT displayed.

__aria-controls=IDREF__

Refers to the tabpanel element associated with the tab.


__role=tabpanel__

Indicates the element serves as a container for tab panel content.

__aria-labelledby=IDREF__ 

Refers to the tab element that controls the panel.

{{docs-note}}