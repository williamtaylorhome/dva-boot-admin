# Paging function
Pagehelper just helps us assemble pagination and query conditions, and will not perform actual query

## how to use

```js
// Create a PageInfo object
cosnt pageInfo = PageHelper.create();

// Generate query parameters on the first page of the first page
pageInfo.startPage(); // { pageNum: 1, pageSize: 10 }

// Generate the query parameters of Article 20 per page of the second page
pageInfo.startPage(2, 20); // { pageNum: 2, pageSize: 20 }

// Jump to the third page
pageInfo.jumpPage(3); // { pageNum: 3, .... }

// Jump to the next page, last page
pageInfo.nextPage(); // { pageNum: 4, .... }
pageInfo.prevPage(); // { pageNum: 3, .... }

// Jump to page 4 and take query conditions
pageInfo.filter({ name: 'jonn' }).jumpPage(4); // { pageNum: 4, filters: { name: 'jonn' }, .... }
// When the second condition is True, it will bring the previous query conditions
pageInfo.filter({ age: '18' }, true) // { pageNum: 4, filters: { name: 'jonn', age: '18' }, .... } 

// Ascending the name, the age order is generated
pageInfo.sortBy({name: 'asc', age: 'desc'}); // { sorts: {name: 'asc', age: 'desc'}, .... }

```