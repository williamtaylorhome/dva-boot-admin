import $$, { request } from 'cmn-utils';
import objectAssign from 'object-assign';
import PageInfo from './pageHelper/PageInfo';
import config from '@/config';

const REQUEST = '@request';
const REQUEST_SUCCESS = '@request_success';
const REQUEST_ERROR = '@request_error';
/**
 * If you just want to change a state, you can use this action on the page
 * dispatch({
 *   type: 'crud/@change',
 *   payload: {
 *     showModal: true,
 *   },
 *   success: () => {
 *     console.log('state updated!')
 *   }
 * })
 */
const CHANGE_STATE = '@change';
const CHANGE_STATE_SUCCESS = '@change_success';

/**
 * Encapsulate asynchronous methods in a service, such as in a model
   const url = '/getPageList';
   const pageInfo = yield call(asyncRequest, {... payload, url});
   yield put({
     type: 'getPageListSuccess',
     payload: pageInfo
   });
 * @param {*} payload
 */
export async function asyncRequest(payload) {
  if (!payload || !payload.url)
    throw new Error('payload require contains url opt');
  /**
   *  can be configured in other  method headers data and other parameters
   */
  const { url, pageInfo, ...other } = payload;

  // In the case of a paginated query (formatted send parameter)
  if (pageInfo && pageInfo instanceof PageInfo) {
    const { pageNum, pageSize, filters, sorts } = pageInfo;
    let data = { pageNum, pageSize, filters, sorts };

    if ($$.isFunction(config.pageHelper.requestFormat)) {
      data = config.pageHelper.requestFormat(pageInfo);
    }
    other.data = data;
  }

  const _promise = other.method
    ? request[other.method.toLowerCase()](url, other.data, other)
    : request.send(url, other);

  // If it's a paginated query (formatting the reverse result)
  if (pageInfo && pageInfo instanceof PageInfo) {
    return _promise.then(resp => {
      if ($$.isFunction(config.pageHelper.responseFormat)) {
        const newPageInfo = config.pageHelper.responseFormat(resp);
        // Generate a new instance to prevent the old and new instances from pointing to the same instance
        return objectAssign(new PageInfo(), pageInfo, newPageInfo);
      }
    });
  } else {
    return _promise;
  }
}

export const simpleModel = {
  namespace: $$.randomStr(4),
  enhance: true,
  state: {},
  effects: {},
  reducers: {}
};

export default model => {
  const { namespace, state, subscriptions, effects, reducers, enhance } = {
    ...simpleModel,
    ...model
  };

  if (!enhance) {
    return { namespace, state, subscriptions, effects, reducers };
  }
  return {
    namespace,
    state,
    subscriptions,
    effects: {
      // get old effect
      ...effects,
      /**
       * payload If you pass in a payload in the form of an array, the result will be merged and the rendering will be invoked once
       * success gets a successful callback after the dispatch ends
       * error gets a failed callback after the dispatch ends
       * afterResponse simulates operations in reduce, giving us the opportunity to process reversed data without side effects
       */
      *[REQUEST]({ payload, success, error, afterResponse }, { call, put }) {
        let _payloads = [];
        if ($$.isObject(payload)) {
          _payloads.push(payload);
        } else if ($$.isArray(payload)) {
          _payloads = payload;
        }

        const resultState = {
          success: {},
          error: {}
        };

        for (let i = 0; i < _payloads.length; i++) {
          /**
           * valueField: The returned result will be received using the value of the valueField field
           * notice: Pop-up notifications
           * actionType: If an actionType exists, indicates that the reducer is being processed,The value is actionType + ('_SUCCESS' | '_ERROR')
           */
          const { valueField, notice, actionType, ...otherPayload } = _payloads[i];

          try {
            let response = yield call(asyncRequest, otherPayload);

            // Handle the reversed data yourself, simulate the operation in reduce, and don't write functions with side effects
            if ($$.isFunction(afterResponse)) {
              let _r = afterResponse(response);
              if (_r) response = _r;
            }

            // If a callback is needed
            if (otherPayload.success) {
              otherPayload.success(response);
            }

            // Notification feature if needed
            if (notice) {
              config.notice.success(notice === true ? '操作成功' : notice[0]);
            }

            // If it exists action type,then it means that it has been processed by itself reducer
            if (actionType) {
              yield put({
                type: `${actionType}_SUCCESS`,
                payload: response
              });
            } else {
              // Prepare the return value
              resultState.success[valueField || '_@fake_'] = response;
            }
          } catch (e) {
            resultState.error['error'] = e;

            // Internal callbacks if needed
            if ($$.isFunction(otherPayload.error)) {
              otherPayload.error(e);
            } else if ($$.isFunction(error)) {
              error(e);
            }

            // notice reducer If it exists actionType,then it means that it has been processed by itself reducer
            yield put({
              type: actionType ? `${actionType}_ERROR` : REQUEST_ERROR,
              payload: resultState.error
            });
            // Early termination in case of error
            break;
          }
        }

        // Notification Reducer
        if (Object.keys(resultState.success).length) {
          // If a callback is needed
          if ($$.isFunction(success)) {
            success(resultState.success);
          }

          yield put({
            type: REQUEST_SUCCESS,
            payload: resultState.success
          });
        }
      },

      *[CHANGE_STATE]({ payload, success }, { put }) {
        yield put({
          type: CHANGE_STATE_SUCCESS,
          payload
        });

        if ($$.isFunction(success)) {
          success();
        }
      }
    },

    reducers: {
      // get old reducers
      ...reducers,
      // append new request reducers
      [REQUEST_SUCCESS]: _changeState,
      [REQUEST_ERROR]: _changeState,
      [CHANGE_STATE_SUCCESS]: _changeState
    }
  };
};

const _changeState = (state, { payload }) => ({
  ...state,
  ...payload
});
