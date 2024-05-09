# Global configuration
Global configuration is under 'src/config.js' where you can configure global notifications, requests, exception handling, paging formatting, data simulation, etc

## notice
Now there are two notification styles in the framework, one is the notification 'antdNotice' modified from the **AntD** style, and the other is the built-in notification style 'normal', the notification will act on the success or failure of the operation, or when using 'this.notice' on the view page, how to write our own notification style, which will be introduced in the **components** section.
```js
import { normal, antNotice } from 'components/Notification';

// System Notification, defines what style of notification to use, normal or antdNotice
const notice = antNotice;
```

## request
We use the requets in the [**cmn-utils**] (https://github.com/LANIF-UI/cmn-utils) library to handle our requests, so we also configure their requests here, we show a few typical uses below, and more configurations can be found in cmn-utils.
```js
  request: {
    // Configure this parameter to increment this prefix by default every time a request is sent
    prefix: '/api',

    // You can customize the header information according to the requirements of the interface, and these parameters will be carried in the header of each request
    withHeaders: () => ({
      token: store.getStore("token"),
    }),

    /**
     * Each request is reversed and enters this function first.
     * Because modelEnhance needs to know the data that the server reverses,
     * What is a success and what is a failure, such as
     * {status: true, data: ...} // Success
     * {status: false, message: ...} // Failed
     * In practice, it should be reversed through the server
     * Success and failure identifiers to distinguish between them
     */
    afterResponse: (response) => {
      const {status, message} = response;
      if (status) {
        return response;
      } else {
        // Here we throw an exception that will be intercepted in the following errorHandle
        throw new Error(message);
      }
    },

    // That is, this function is entered when there is an error in the request
    errorHandle: err => {
      // Request error global interception
      if (err.name === 'RequestError') {
        notice.error(err.text || err.message);
      }
    }
  },
```

## exception 

This is the 'onError' in dvajs, which can be triggered when 'src/index.js', 'effect' execution error or 'subscription' is actively thrown through 'done', which can be used to manage the global error state.
```js
app.use({ onError: config.exception.global });
```

## PageHelper 

The pagination assistant is an encapsulation of all pagination requests in the program, why put this piece of single, instead of assembling pagination data when sending requests, mainly to simplify pagination operations, because the backend may not provide standard data according to our front-end data table components, so every time you request data, you will need to manually convert the data, you can take the query conditions when querying pagination, see the following code comparison
```js
// Didn't use pageHelper
dispatch({
  type: 'crud/@request',
  payload: {
    valueField: 'pageData',
    url: '/crud/getList',
    data: {
      currentPage: 1,
      showCount: 10,
      paramMap: {}
    },
    success: resp => {
      return {
        pageNum: resp.currentPage,
        pageSize: resp.showCount,
        total: resp.totalResult,
        totalPages: resp.totalPage,
        list: resp.dataList
      }
    }
  }
});

// Use pageHelper
dispatch({
  type: 'crud/@request',
  payload: {
    valueField: 'pageData',
    url: '/crud/getList',
    pageInfo: pageData.startPage(1, 10),
  }
});
```
For specific configuration items, assuming that the data format returned by the API is 'currentPage' for the current page, 'showCount' for the total number of pages, sortMap' for the sorting item, and 'paramMap' for the query parameter, you can view the crud.js under __mocks__ for the example API
```js
pageHelper: {
  // Format the data to be sent to the backend and write it by the backend interface
  requestFormat: pageInfo => {
    const { pageNum, pageSize, filters, sorts } = pageInfo;
    return {
      currentPage: pageNum, // Current page
      showCount: pageSize,  // Total number of pages
      sortMap: sorts,       // Sort fields
      paramMap: filters     // Query parameters
    };
  },

  // Format the data that is reversed from the backend, and format the data that is reversed by the backend as the data that we need for the pagination component
  responseFormat: resp => {
    const {
      currentPage, 
      showCount,
      totalResult,
      dataList,
      totalPage
    } = resp.data;
    return {
      pageNum: currentPage,
      pageSize: showCount,
      total: totalResult,
      totalPages: totalPage,
      list: dataList
    };
  }
},
```

## router 

You can change the loading effect to your favorite loading style when switching routes

## mock

Simulate the function of success and failure of the background response, the usage can be seen in the file under __mocks__, example：
```js
const data = { name: 'jonn' }
// After using the toSuccess package
toSuccess(data) // { status: true, data: { name: 'jonn'} }
// After wrapping with toError
toError('Violation of uniqueness constraints') // { status: false, message: 'Violation of uniqueness constraints' }
```
It should be the same as the data returned by the backend interface