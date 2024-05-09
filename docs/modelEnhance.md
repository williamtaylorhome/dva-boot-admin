# modelEnhance
This is a packaging of DVA Model, about Model in DVA，Be able to[Official websiteficial website](https://dvajs.cLearnpi/#model) Learn,This packaging allows us to simplify its Model writing.We use it for every `modelEnhance`Packed **model** Add one `@request` Type of `effects` Corresponding `reducers`

## Why use increase `@request` type
Use the `Modlenhance` not to let us write the asynchronous requests into the view component, just to allow us to make some simple requests, not to define the` Model` and `Service`. If you are not used to this writing, it is completely exactly You can write it in the previous writing. This is just a grammar sugar.

### scene one
User management list, use user `ID` to obtain the detailed information of each user, let us take a look at the differences between the two writing methods:

**Previous writing**
```js
// service.js Definition interface
// Use user ID to obtain user information
export async function getDetail(payload) {
  return $$.post('/user/getDetail', payload);
}

// model.js Data processing
export default {
  namespace: 'user',
  state: {
    userInfo: {},
  },
  effects: {
    *getDetail({ payload }, { call, put }) {
      const { status, message, data } = yield call(getDetail, payload);
      if (status) {
        yield put({
          type: 'getDetailSuccess',
          payload: data
        });
      } else {
        yield put({
          type: 'getDetailError',
          payload: { message }
        });
      }
    },
  },

  reducers: {
    getDetailSuccess(state, { payload }) {
      return {
        ...state,
        userInfo: payload
      };
    },
    getDetailError(state, { payload }) {
      return {
        ...state,
        message: payload.message
      };
    },
  }
};

// component.js send request
dispatch({
  type: 'user/getDetail',
  payload: { id: 'xxx' }
});
```

It can be seen that we are just checking a user information, but it involves the read and write of the three files. If the writing of `Modlenhance` is written, you only need to write the following code in the` Component`:

```js
dispatch({
  type: 'user/@request',
  payload: {
    valueField: 'userInfo',
    url: '/user/getDetail',
    data: { id: 'xxx' }
  }
});
```

This method is the same as what we do in `Model` and` Service`, but it is just to help us complete the duplicate work by `Modlenhance`

### Scene two
Processing paging requests, data tables and queries with pagination in the background system are often written, and logic is also similar. At this time, we only need to bring `Pageinfo` variables in`@Request` to be convenient to be convenient. Send a pagination request

```js
// model.js Initialize onelize one PaInstanceInfo  Instance PageHelper.create()
import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';

export default modelEnhance({
  namespace: 'crud',
  state: {
    pageData: PageHelper.create(),
  }
}

// component.js Use PageInfo to paged directly when request.
dispatch({
  type: 'crud/@request',
  payload: {
    valueField: 'pageData',
    url: '/crud/getList',
    pageInfo: pageData.startPage(1, 10),
  }
});

// Use Filter to add query conditions and use jumppage to make a page jump
dispatch({
  type: 'crud/@request',
  payload: {
    valueField: 'pageData',
    url: '/crud/getList',
    pageInfo: pageData.filter(values).jumpPage(2),
  }
});
```

### Another way of scene two
The above writing is to write business logic into the view component. This writing is suitable for simple and not reuse scenes.

If we do not want business and views to be coupled to one place, and the same `@Request` needs to be repeated multiple times. At this time, we recommend this writing (DVA standard writing), that is, separate business into ** Model **,,, the business is separated in ** Model **,,, the business is separated in the ** Model **, and it is separated. Use `put` to send out`@request` in `Effects`, call the corresponding` empatch` in the component

model.js For details, please refer to the writing of the Model in the*CRUD*Example
```js
// Get pagination data
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
}
```

## how to use

```js
// In the component
dispatch({
  type: 'ns/@request',      // @request
  payload: {
    actionType: 'typeName', // Indicates self -processed Reducer, the value is ActionType + ('_Success' | '_error'), and there is no need to set this attribute to set this attributevalueField
    valueField: 'shopList', // Corresponding to the key in the state in the model, the response result will be stored in this variable, not necessary
    url: 'apiAddress',      // Interface address, must
    method: 'POST',         // The default is posted request, not necessary
    data: {},               // The parameters that need to be passed are not necessary
    pageInfo: pageData.startPage(1, 10), // Pagling request data, you don't have to write a data parameter with this, not necessary
    notice: true,           // The notice after the operation is completed, it must 
   },
  afterResponse: resp => resp, // It allows us to have the opportunity to process the reverse data, not necessary
  success: resp => {}, // After the dispatch is over, it is successful.
  error: e => {}, // After the dispatch is over, the recovery of failure is not necessary
});

// In Effects
*getPageInfo({ payload }, { put }) {
  yield put({
    // Above
  });
}
```