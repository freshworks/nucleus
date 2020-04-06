@freshworks/pagination
==============================================================================

```
yarn add @freshworks/pagination
```

Pagination is used when a large set of data needs to be displayed in a list or table across multiple pages. Nucleus Pagination provides a paginator with visual page numbers for navigation. The component also abstracts the calculation of the items that are displayed on the current page. The developer only needs to pass the total array of records to the pagination component.


Scenario
------------------------------------------------------------------------------

Pagination can be used to display the list of contacts, companies or tickets across multiple pages in the form of a table

Guidelines
------------------------------------------------------------------------------
**Do's**
1. Pagination should be used when a large set of content is displayed with tables or lists.

2. Though the number of items on a page can be altered, ensure that the default is reasonable. 

3. Use Mini Pagination when the pagination is to be done inside a toolbar. 


**Dont's**

1. Do not use pagination if the number of items is known to be less.

2. Do not override the actions and behaviour of pagination and paginator 


