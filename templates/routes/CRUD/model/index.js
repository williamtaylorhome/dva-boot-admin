import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';
/**
 * True when the page finishes loading for the first time
 * You can use this value to prevent when switching pages
 * Initialize the data multiple times
 */
let LOADED = false;
export default modelEnhance({
  namespace: '<%=name %>',

  state: {
    pageData: PageHelper.create(),
    employees: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/<%=name %>' && !LOADED) {
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
      const { pageData } = yield select(state => state.<%=name %>);
      yield put({
        type: 'getPageInfo',
        payload: {
          pageData: pageData.startPage(1, 10)
        }
      });
    },
    // Get paginated data
    *getPageInfo({ payload }, { call, put }) {
      const { pageData } = payload;
      yield put({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: '<%=api_0 %>',
          pageInfo: pageData
        }
      });
    },
    // Save to query the pagination after that
    *save({ payload }, { call, put, select }) {
      const { values, success } = payload;
      const { pageData } = yield select(state => state.<%=name %>);
      yield put({
        type: '@request',
        payload: {
          notice: true,
          url: '<%=api_1 %>',
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
      const { pageData } = yield select(state => state.<%=name %>);
      yield put({
        type: '@request',
        payload: {
          notice: true,
          url: '<%=api_2 %>',
          data: records.map(item => item.id)
        }
      });
      yield put({
        type: 'getPageInfo',
        payload: { pageData }
      });
      success();
    }
  },

  reducers: {}
});
