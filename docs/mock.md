# Mock How to write data

We use Mock.js to generate random data, so we need to go to their [official website] (http://mockjs.com) to find out before we mock the data.

## How to register a simulated interface

0. Create a new file under 'src/__mocks__', e.g. demo.js.
1.at `src/index.js` to register a newly created demo.js.
```js
import packMock from '@/utils/packMock';
import demo from './demo';

packMock(
  demo,
);
```
2. Emulate the required interfaces in the demo.js.

## Usage

### Expose simple objects directly
demo.js
```js
export default {
  // Get method followed by the interface address
  'GET /api/getUserInfo': {
    name: 'drizzle',
    sex: 'man',
    age: 18,
  },
  // You can leave the request method unspecified
  '/api/getUserInfo1': ['one', 'two', 'three'],
}
```

### Using API functions, random data can be generated
demo.js
```js
export default ({ fetchMock, delay, mock, toSuccess, toError }) => {
  return {
    '/api/charts/bar1': options => {
      return toSuccess(
        mock([
          { year: '1951 year', "sales|1-100": 100 }, // A random number of 1-100
          { year: '1952 year', "sales|1-100": 100 },
          { year: '1956 year', "sales|1-100": 100 },
          { year: '1957 year', "sales|1-100": 100 },
          { year: '1958 year', "sales|1-100": 100 },
        ]),
        400
      );
    },
  };
};
```

## API

### `delay`
In order to make the analog interface more realistic, it can add a delay, unit MS, such as:
```js
// Random delay
delay({ no: 123 }) // { no: 123 }

// 200 millisecond delay
delay({ no: 123 }, 200) // { no: 123 } 
```

### `mock`
If you need to generate random numbers, you need to use the `Mock` function, the mock function writing method refer to http://mockjs.com/examples.html
```js
mock({ "string|1-10": "★" }) // { "string": "★★★★★★★" }
```

### toSuccess | toError
This is the `tosuccess, toer trade under the` mock` in the global configuration file `src/config.js`, which allows us to write a few lines of code when we simulate the interface.
```js
// Random delay
toSuccess(mock({ 
  "string|1-10": "★" 
}))
// { status: true, data: { string: "★★" } }

// Increase 400ms delay
toSuccess(mock({ 
  "string|1-10": "★" 
}), 400)
// { status: true, data: { string: "★★★★" } }
```

### `fetchMock`
FETCHMOCK can intercept the request and use analog data instead of the real interface data. The framework itself has been packed and packaged.，[Fetchmock official website](http://www.wheresrhys.co.uk/fetch-mock/api)，Generally do not need to expand.


## Docking upright interface
When the backend is provided to our real interface, we need to replace our simulation interface. Here I just simply comment on the simulation interface, or inject this file in the `__mocks __/Index.js`. I hope everyone will provide a one A better way.

