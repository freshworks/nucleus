# Table

```sh
yarn add @freshworks/table
```

## Simple Usage of Table

In the simplest form, nucleus-table takes in the rows and columns and presents it as a table

{{nucleus-table/demo-1}}


## Customising the Table 

#### 1. Basic Customisation Attributes

We can specify the number of rows per page with the `pageSize` property and also change the main paginator to a mini paginator with the `isMini` property. We can also disable the filter mechanism with the `canFilter` property

{{nucleus-table/demo-2}}

#### 2. Selection of all Rows

The `selectAll` prop can be used to select all entries displayed on the table currently

{{nucleus-table/demo-3}}

## Advanced Usage

Nucleus Table provides attributes and contextual components to deal with many real-world usecases 

#### 1. Using custom table cell components

We can use custom components for the cells by accessing the table cell's contextual component. It exposes the cell's value as `value` and also the current column and row as `column` and `row` attribute respectively.

{{nucleus-table/demo-6}}

#### 2. Using a contextual Pagination Component

There are times when we want to specify an extra paginator for the table at a location of our choice. The contextual Pagination component gives the ability to use a paginator at any location like within a toolbar.  

{{nucleus-table/demo-5}}

#### 3. Using the Selected Rows 

The selected rows can be accessed using the `selectedRows` attribute as shown below. 

{{nucleus-table/demo-4}}


## Accessibility 

1. Use the `tableCaption` attribute to the table to give an overview about the table's contents
```hbs
  {{#nucleus-table
    columns=columns
    rows=rows
    tableCaption="Contact Details"
    as |table|
  }}
    {{table.table}}
  {{/nucleus-table}}
```

2. If you are using custom components inside the cell, ensure that the component is appropriately accessible

## Guidelines

✅**Do's**



🚫**Dont's**


{{docs-note}}
