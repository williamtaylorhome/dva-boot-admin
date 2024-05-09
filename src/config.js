import React from 'react';
import PageLoading from 'components/Loading/PageLoading';
import { normal } from 'components/Notification';
import store from 'cmn-utils/lib/store';

// System Notification, defines what style of notification to use, normal or antdNotice
const notice = normal;

/**
 * Application configuration such as request format, reverse format, exception handling, pagination format, etc
 */
export default {
  /**
   * HTML title template
   */
  htmlTitle: 'DBAdmin - {title}',
  
  /**
   * System notifications
   */
  notice,

  // Asynchronous request configuration
  request: {
    prefix: '/api',

    // Each request will have these parameters in its header
    withHeaders: () => ({
      token: store.getStore("token"),
    }),

    /**
     * Because modelEnhance needs to know the data that the server reverses,
     * What is a success and what is a failure, such as
     * {status: true, data: ...} Represents success
     * {status: false, message: ...} Represents a failure
     * In practice, it should be reversed through the server's response
     * Success and failure flags to distinguish between them
     */
    afterResponse: response => {
      const { status, message } = response;
      if (status) {
        return response;
      } else {
        throw new Error(message);
      }
    },
    errorHandle: err => {
      // Request error global interception
      if (err.name === 'RequestError') {
        notice.error(err.text || err.message);
      }
    }
  },

  // Global anomalies
  exception: {
    global: (err, dispatch) => {
      const errName = err.name;
      // Request error The request is exceptional
      if (errName === 'RequestError') {
        notice.error(err.message);
        console.error(err); 
      } else {
        console.error(err);
      }
    },
  },

  // Pagination assistant
  pageHelper: {
    // Format the data to be sent to the backend
    requestFormat: pageInfo => {
      const { pageNum, pageSize, filters, sorts } = pageInfo;
      return {
        currentPage: pageNum,
        showCount: pageSize,
        sortMap: sorts,
        paramMap: filters
      };
    },

    // Format the data that is reversed from the backend
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

  // Route loading effect
  router: {
    loading: <PageLoading loading />
  },

  /**
   * Wrap the reverse data when simulating the data
   * This is because when the backend reverses data, it usually wraps a layer of state information on the outside
   * If successful:
   * {
   *   status: true,
   *   data: responseData
   * }
   * Or in the event of an error:
   * {
   *   status: false,
   *   code: 500,
   *   message: 'Wrong username or password'
   * }
   * Here's how these two functions are configured, so that we can write a few lines less code when simulating the data.
   */
  mock: {
    toSuccess: response => ({
      status: true,
      data: response
    }),

    toError: message => ({
      status: false,
      message: message
    })
  }
};
