# Pagination

```sh
yarn add @freshworks/pagination
```

Pagination is used when a large set of data needs to be displayed in a list or table across multiple pages. Nucleus Pagination provides a paginator with visual page numbers for navigation. The component also abstracts the calculation of the items that are displayed on the current page. The developer only needs to pass the total array of records to the pagination component. 


## Usage

#### 1. Basic Pagination

The `pageItems` variable can be used to display the items on the current page using a list or table of choice. The Paginator can be displayed on any desired position using the `paginator` contextual component.

{{nucleus-pagination/demo-1}}

#### 2. Pagination with many pages

When the content is spread across more pages than is visible in the list, the last and first page are always made avaiable for easy navigation 

{{nucleus-pagination/demo-2}}

#### 3. Pagination without Page Numbers

The page numbers in the Paginator list can be hidden using the `hasPageNos` prop 

{{nucleus-pagination/demo-3}}

#### 4. Mini Pagination

Mini Pagination provides secondary buttons for navigation. It can be placed inside a toolbar alongside other buttons

{{nucleus-pagination/demo-4}}

## Guidelines

✅**Do's**

1. Pagination should be used when a large set of content is displayed with tables or lists.

2. Though the number of items on a page can be altered, ensure that the default is reasonable. 

3. Use Mini Pagination when the pagination is to be done inside a toolbar. 

🚫**Dont's**

1. Do not use pagination if the number of items is known to be less.

2. Do not override the actions and behaviour of pagination and paginator 

## Accessibility

1. `aria-label = "pagination"` helps in identification of paginator

2. The disabled paginator buttons are identified with `aria-disabled`

3. The current page is identified with `aria-current="page"`

4. The Paginator is enclosed in a `nav` component to identify with navigation