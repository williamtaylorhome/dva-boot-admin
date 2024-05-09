// http://www.wheresrhys.co.uk/fetch-mock/api
// http://mockjs.com/
import fetchMock from 'fetch-mock';
import $$ from 'cmn-utils';
import Mock from 'mockjs';
import config from '@/config';
const mock = Mock.mock;

/**
 * Simulate a delayed request
 * @param {any} response simulates response data
 * @param {number} time delay of how many milliseconds, omitting this province will generate a delay within 100ms
 */
const delay = (response, time) => {
  return () => $$.delay(time || Math.random() * 100).then(() => response);
};

// Wrap the reverse data when simulating the data
const toSuccess = (response, time) => {
  if (time) {
    return delay(config.mock.toSuccess(response), time);
  } else {
    return config.mock.toSuccess(response);
  }
};
const toError = (message, time) => {
  if (time) {
    return delay(config.mock.toError(message), time);
  } else {
    return config.mock.toError(message);
  }
};

export default (...mocks) => {
  /**
   * If the configuration is not intercepted, the native fetch method is used
   */

  fetchMock.config = {
    ...fetchMock.config,
    fallbackToNetwork: true,
    warnOnFallback: false
  };

  mocks.forEach(mockFile => {
    let mockAPIs = {};
    if ($$.isFunction(mockFile)) {
      mockAPIs = mockFile({ fetchMock, delay, mock, toSuccess, toError });
    } else if ($$.isObject(mockFile)) {
      mockAPIs = mockFile;
    } else {
      throw new Error('mock file require both Function or Object');
    }

    for (const key in mockAPIs) {
      const method_url = key.split(' ');

      // 'GET /api/getUserInfo'
      let method = 'mock';
      let url = null;
      if (method_url.length === 2) {
        method = method_url[0].toLowerCase();
        url = method_url[1];
      } else {
        url = method_url[0];
      }

      // Handle regular cases i.e. URLs with regexp: at the beginning
      if (url.indexOf('regexp:') === 0) {
        url = new RegExp(url.substring(7));
      }

      /**
       * If you want to return different data for the parameters of the request, such as turning pages
       * When parsing the number of pages in the body or query conditions, and returning the corresponding data,
       * At this point, you can write the mock as a function, which will receive the fetch when it is sent
       * options as argument fetch(url, options)
       */
      if ($$.isFunction(mockAPIs[key])) {
        fetchMock[method](url, (url, options) =>
          mockAPIs[key]({ url, ...options })
        );
      } else {
        fetchMock[method](url, mockAPIs[key]);
      }
    }
  });
};

export { mock };
