import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';
/**
 * True when the page finishes loading for the first time
 * You can use this value to prevent when switching pages
 * Initialize the data multiple times
 */
let LOADED = false;
export default modelEnhance({
  namespace: 'crud',

  state: {
    pageData: PageHelper.create(),
    employees: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/crud' && !LOADED) {
          LOADED = true;
          dispatch({
            type: 'init'
          });
        }
      });
    }
  },

  effects: {
    // Go to page load
    *init({ payload }, { call, put, select }) {
      const { pageData } = yield select(state => state.crud);
      yield put({
        type: 'getPageInfo',
        payload: {
          pageData: pageData.startPage(1, 10)
        }
      });
      yield put({
        type: 'getEmployees'
      });
    },
    // Get paginated data
    *getPageInfo({ payload }, { call, put }) {
      const { pageData } = payload;
      yield put({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: '/crud/getList',
          pageInfo: pageData
        }
      });
    },
    // Save to query the pagination after that
    *save({ payload }, { call, put, select, take }) {
      const { values, success } = payload;
      const { pageData } = yield select(state => state.crud);
      // put is non-blocking put.resolve It is a blocking type
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: '/crud/save',
          data: values
        }
      });

      yield put({
        type: 'getPageInfo',
        payload: { pageData }
      });
      success();
    },
    // revise
    *update({ payload }, { call, put }) {},
    // Query pagination after deleting
    *remove({ payload }, { call, put, select }) {
      const { records, success } = payload;
      const { pageData } = yield select(state => state.crud);
      yield put({
        type: '@request',
        payload: {
          notice: true,
          url: '/crud/bathDelete',
          data: records.map(item => item.id)
        }
      });
      yield put({
        type: 'getPageInfo',
        payload: { pageData }
      });
      success();
    },
    // Get a list of employees
    *getEmployees({ payload }, { call, put }) {
      yield put({
        type: '@request',
        afterResponse: resp => resp.data,
        payload: {
          valueField: 'employees',
          url: '/crud/getWorkEmployee'
        }
      });
    }
  },

  reducers: {}
});
