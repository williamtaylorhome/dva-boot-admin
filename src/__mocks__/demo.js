/**
 * Simulate request data
 * @ param {FetchMock} fetchMock when the existing conditions are not met, you can use fetchMock to expand
 * @ param {function} delay increases delay time ms example: delay(mockData) or delay(mockData, 200)
 * @ param {function} mock Use mock to generate data, for example:

   mock ({
     'string | 1-10 ':'★'// generate at least 1 and at most 10 star characters
   })

   // {'string ':'★★★★★★'}

  More Uses Reference http://mockjs.com/examples.html
 */
export default ({fetchMock, delay, mock, toSuccess, toError}) => {
  // If the existing extension does not meet the requirements, you can directly use the fetchMock method
// fetchMock.mock(/httpbin.org\/post/, {/* response */}, {/* options */});

  return {
    // Support Method Header
    'GET /api/getUserInfo': {
      name: '小雨',
      sex: '男',
      age: 18,
    },
    // Simulate Real Request Delay Effect
    '/api/getUsers': delay([
      { name: 'jonn' },
      { name: 'weiq' },
    ]),
    // Match regexp
    'regexp:/api/aaa/.*': {},
    // Match a url beginning with a string
    'begin:http://www.site.com': {},
    // Match a url ending with a string
    'end:.jpg': {},
    // Match a url using a glob pattern
    'glob:http://*.*': {},
    // Match a url that satisfies an express style path
    'express:/user/:user': {},
    // Table with paging, written in function form can use request parameters,
// More realistic simulation of back-end data processing services
    '/api/userInfo/getList': (options) => {
      const body = JSON.parse(options.body);
      const pageNum = body.pageNum;
      const idbase = (pageNum - 1) * 10 + 1;
      return toSuccess(mock({
        'pageNum': pageNum,
        'pageSize': 10,
        'size': 10,
        'total': 100,
        'totalPages': 10,
        'list|10': [{
          'id|+1': idbase,
          'name': '@cname',                   // Chinese name
          'age|1-100': 100,                   // random integer within 100
          'birthday': '@date("yyyy-MM-dd")',  // Date
          'city': '@city(true)',              // chinese cities
          'phone': /^1[385][1-9]\d{8}/        // Mobile phone number
        }],
      }), 400)
    }
  } 
}