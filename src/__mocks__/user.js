/**
 * Simulate request data
 * @param {FetchMock} fetchMock When the existing conditions are not met, you can use fetchMock to extend it
 * @param {function} delay Increase the delay time ms example: delay(mockData) 或 delay(mockData, 200)
 * @param {function} mock Use mocks to generate data, example:

   mock({
     'string|1-10': '★' // Generate a minimum of 1 and a maximum of 10 star characters
   })

   {'string': '★★★★★★'}

  More usage references http://mockjs.com/examples.html
 */
export default ({fetchMock, delay, mock, toSuccess, toError}) => {
  // If an existing extension doesn't meet your needs, you can use it directly fetchMock way
// fetchMock.mock(/httpbin.org\/post/, {/* response */}, {/* options */});

  return {
    '/api/user/login': (options) => {
      if (options.body) {
        const user = JSON.parse(options.body);
        if (user.userName === 'admin' && user.password === 'admin') {
          return toSuccess(mock({
            'userName': 'admin',                // Username
            'name': '@cname',                   // Chinese name
            'age|1-100': 100,                   // A random integer within 100
            'birthday': '@date("yyyy-MM-dd")',  // Date
            'city': '@city(true)',              // Chinese cities
            'phone': /^1[385][1-9]\d{8}/,       // Mobile phone number
            'token': '@guid'                    // Token
          }), 400);
        } else {
          return toError('Wrong username or password admin/admin');
        }
      } else {
        return toError('Please enter your username and password');
      }
    },
    '/api/user/register': options => toSuccess(),
    '/api/user/menu': options => toSuccess([
      {
        name: 'dashboard',
        icon: 'DashboardOutlined',
        path: '/dashboard',
      },
      {
        name: 'subassembly',
        icon: 'DesktopOutlined',
        path: '/component',
        children: [
          {
            name: 'toolbar',
            path: '/toolbar',
          },
          {
            name: 'BaseComponent',
            path: '/baseComponent',
          },
          {
            name: 'Columns',
            path: '/column',
          },
          {
            name: 'Search bar',
            path: '/searchBar',
          },
          {
            name: 'Data tables',
            path: '/datatable',
          },
          {
            name: 'Forms',
            path: '/form',
          },
          {
            name: 'Shuttle tree',
            path: '/transferTree',
          },
          {
            name: 'chart',
            path: '/charts',
            children: [
              {
                name: 'ECharts',
                path: '/charts/ec',
              },
              {
                name: 'G2',
                path: '/charts/g2',
              },
            ]
          },
          {
            name: 'print',
            path: '/print',
          },
          {
            name: 'Banner management',
            path: '/banner',
          },
        ],
      },
      {
        name: 'UI elements',
        icon: 'ShareAltOutlined',
        path: '/ui',
        children: [
          {
            name: 'button',
            path: '/button',
          },
          {
            name: 'Image',
            path: '/image',
          },
          {
            name: 'message',
            path: '/alerts',
          },
          {
            name: 'animation',
            path: '/animations',
          },
          {
            name: 'icon',
            path: '/icons',
          },
          {
            name: 'Rich text',
            path: '/editor',
          },
          {
            name: 'Modal window',
            path: '/modal',
          },
          {
            name: 'shield',
            path: '/mask',
          },
        ],
      },
      {
        name: 'Page',
        icon: 'BookOutlined',
        path: '/page',
        children: [
          {
            name: 'Landing page',
            path: '/sign/login',
          },
          {
            name: 'Registration page',
            path: '/sign/register',
          },
          {
            name: 'Lock screen',
            path: '/lock',
          },
          {
            name: 'Gallery',
            path: '/gallery',
          },
          {
            name: 'Blank page',
            path: '/blank',
          },
          {
            name: 'Results page',
            path: '/result',
          },
          {
            name: 'Coming Soon',
            path: '/coming',
          },
          {
            name: '403',
            path: '/403',
          },
          {
            name: '404',
            path: '/404',
          },
          {
            name: '500',
            path: '/500',
          },
          {
            name: 'Multi-level routing',
            path: '/level-route/:sub?',
          },
        ],
      },
      {
        name: 'General Scenario',
        icon: 'BulbOutlined',
        path: '/business',
        children: [
          {
            name: 'CRUD',
            path: '/crud/:detail?',
          }
        ],
      },
    ], 400)
  } 
}