import React from 'react';
import moment from 'moment';
import { InputNumber, Button } from 'antd';

export const columns1 = [
  {
    name: 'id',
    formItem: {
      type: 'hidden',
    },
  },
  {
    title: 'Role type',
    name: 'roleType',
    dict: [
      { code: '1', codeName: '111' },
      { code: '2', codeName: '222' },
      { code: '3', codeName: '333' },
    ],
    formItem: {
      type: 'select',
    },
  },
  {
    title: 'Character name',
    name: 'roleName',
    formItem: {},
  },
  {
    title: 'sort',
    name: 'ordder',
    formItem: {
      type: 'number',
    },
  },
];

export const columns2 = [
  {
    name: 'id',
    formItem: {
      type: 'hidden',
    },
  },
  {
    title: 'Role type',
    name: 'roleType',
    dict: [
      { code: '1', codeName: '111' },
      { code: '2', codeName: '222' },
      { code: '3', codeName: '333' },
    ],
    formItem: {
      type: 'select',
    },
  },
  {
    title: 'Character name',
    name: 'roleName',
    formItem: {
      initialValue: 'Xiaohei',
    },
  },
];

export const columns3 = [
  {
    name: 'id',
    formItem: {
      type: 'hidden',
    },
  },
  {
    title: 'Role type',
    name: 'roleType',
    dict: [
      { code: '1', codeName: 'Type one' },
      { code: '2', codeName: 'Type two' },
      { code: '3', codeName: 'Type three' },
    ],
    formItem: {
      type: 'select',
      rules: [{ required: true, message: 'Please select one Role type！' }],
    },
  },
  {
    title: 'Character name',
    name: 'roleName',
    formItem: {
      rules: [
        {
          required: true,
          message: 'Please enter Character name',
        },
        {
          pattern: /^[\w\u4E00-\u9FA5()]{1,20}$/,
          message: 'Character name Only 1-20 Chinese characters, English, digits, and parentheses can be entered',
        },
      ],
    },
  },
  {
    title: 'User icon',
    name: 'avatar',
    formItem: {
      type: 'upload',
      listType: 'picture',
      initialValue: [
        {
          uid: 1,
          thumbUrl: 'https://avatars1.githubusercontent.com/u/34116960',
        },
      ],
      rules: [
        {
          required: true,
          message: 'Please select a user avatar',
        },
      ],
      maxFileSize: 1000, // Maximum limit kb
      fileTypes: ['.png', '.jpg', '.gif'], // Allowed types
      max: 2,
    },
  },
  {
    title: 'List of files',
    name: 'picture',
    formItem: {
      type: 'upload',
      initialValue: [
        {
          uid: '1',
          name: 'xxx.png',
          status: 'done',
          response: 'Server Error 500', // custom error message to show
          url: 'http://www.baidu.com/xxx.png',
        },
        {
          uid: '2',
          name: 'yyy.png',
          status: 'done',
          url: 'http://www.baidu.com/yyy.png',
        },
        {
          uid: '3',
          name: 'zzz.png',
          status: 'error',
          response: 'Server Error 500', // custom error message to show
          url: 'http://www.baidu.com/zzz.png',
        },
      ],
    },
  },
  {
    title: 'Direct upload',
    name: 'userFile',
    formItem: {
      type: 'upload',
      action: 'https://httpbin.org/post', // Backend interfaces Example:/uploadFile Will go to the proxy
      fileName: 'file1', // The name received by the backend
    },
  },
];

export const columns4 = [
  {
    title: 'Username',
    name: 'user_name',
    formItem: {
      rules: [
        {
          required: true,
          message: 'Please enter Username',
        },
      ],
    },
  },
  {
    title: 'password',
    name: 'user_password',
    formItem: {
      type: 'password',
    },
  },
];

export const columns5 = [
  {
    title: 'Username',
    name: 'user_name',
    formItem: {
      rules: [
        {
          required: true,
          message: 'Please enter Username',
        },
      ],
    },
  },
  {
    title: 'password',
    name: 'user_password',
    formItem: {
      type: 'password',
      repeat: true,
    },
  },
];

export const columns6 = [
  {
    title: 'date',
    name: 'date',
    formItem: {
      type: 'date',
    },
  },
  {
    title: 'datetime',
    name: 'datetime',
    formItem: {
      type: 'datetime',
      showTime: true,
      initialValue: moment(),
    },
  },
  {
    title: 'Date range',
    name: 'rangedate',
    formItem: {
      type: 'date~',
    },
  },
  {
    title: 'Date range(Time)',
    name: 'rangedate2',
    formItem: {
      type: 'date~',
      showTime: true,
    },
  },
  {
    title: 'Time',
    name: 'time',
    formItem: {
      type: 'time',
    },
  },
];

export const columns7 = [
  {
    title: 'date',
    name: 'date',
    formItem: {
      type: 'date',
    },
  },
  {
    title: 'date(Time)',
    name: 'datetime',
    formItem: {
      type: 'datetime',
      col: { span: 12 },
      formItemLayout: {
        labelCol: { span: 12 },
        wrapperCol: { span: 12 },
      },
      showTime: true,
      initialValue: moment(),
    },
  },
  {
    title: 'Date range',
    name: 'rangedate',
    formItem: {
      col: { span: 12 },
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
      },
      type: 'date~',
    },
  },
  {
    title: 'Date range(Time)',
    name: 'rangedate2',
    formItem: {
      type: 'date~',
      showTime: true,
    },
  },
  {
    title: 'Time',
    name: 'time',
    formItem: {
      type: 'time',
    },
  },
];

export const columns8 = [
  {
    name: 'id',
    formItem: {
      type: 'hidden',
    },
  },
  {
    title: 'color',
    name: 'color',
    formItem: {
      type: 'transfer',
      initialValue: [1, 3],
      dataSource: [
        { key: 1, title: 'red' },
        { key: 2, title: 'yellow' },
        { key: 3, title: 'blue' },
        { key: 4, title: 'green' },
      ],
      onChange: (form, value) => console.log('---:', value),
      listStyle: {
        width: 114,
      },
      rules: [{ required: true, message: 'Choose at least one color!' }],
    },
  },
  {
    title: 'color',
    name: 'popup-color',
    formItem: {
      type: 'transfer',
      modal: {
        // modal attribute
      },
      dataSource: [
        { key: 1, title: 'red' },
        { key: 2, title: 'yellow' },
        { key: 3, title: 'blue' },
        { key: 4, title: 'green' },
      ],
      onChange: (form, value) => console.log('。。。:', value),
      rules: [{ required: true, message: 'Choose at least one color!' }],
    },
  },
];

export const columns9 = [
  {
    title: 'Username',
    name: 'user_name',
    formItem: {},
  },
  {
    title: 'Custom forms',
    formItem: {
      type: 'custom',
      render: (record, form) => {
        const { getFieldDecorator } = form;
        return (
          <div>
            {getFieldDecorator('age', {
              initialValue: record && record.age,
            })(<InputNumber />)}
            <Button size="small">Miscellaneous</Button>
          </div>
        );
      },
    },
  },
];

export const createColumns10 = (self, treeData) => [
  {
    title: 'address',
    name: 'key1',
    formItem: {
      type: 'cascade',
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
            },
          ],
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
            },
          ],
        },
      ],
    },
  },
  {
    title: 'address1',
    name: 'key2',
    formItem: {
      type: 'treeSelect',
      treeData: [
        {
          value: 'zhejiang',
          title: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              title: 'Hangzhou',
            },
          ],
        },
        {
          value: 'jiangsu',
          title: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              title: 'Nanjing',
            },
          ],
        },
      ],
    },
  },
  {
    title: 'asyncTreeSelect',
    name: 'key3',
    formItem: {
      type: 'treeSelect',
      treeData,
      loadData: self.onLoadData,
    },
  },
  {
    title: 'Dividers',
    formItem: {
      type: 'line',
    },
  },
  {
    title: 'Autocomplete',
    name: 'name1',
    formItem: {
      type: 'autoComplete',
      dataSource: ['111', '222', '333'],
    },
  },
  {
    title: 'Autocomplete (asynchronous)',
    name: 'name',
    formItem: {
      type: 'autoComplete',
      loadData: self.onLoadAutoCompleteData,
      valueField: 'name',
      keyField: 'id',
      renderItem: (item) => (
        <div>
          {item.name}/{item.age}岁/{item.city}
        </div>
      ),
    },
  },
];

const innerColumns = [
  {
    title: 'name',
    name: 'name',
    tableItem: {},
  },
  {
    title: 'age',
    name: 'age',
    tableItem: {},
  },
  {
    title: 'address',
    name: 'address',
    tableItem: {},
  },
];

export const createColumns11 = (self, dataSource) => [
  {
    title: 'Username',
    name: 'name',
    formItem: {},
  },
  {
    title: 'Form (pop-up)',
    name: 'field1',
    formItem: {
      type: 'table',
      rowKey: 'id',
      dataSource,
      columns: innerColumns,
      onChange: (form, value, rows) => console.log('。。。:', value, rows),
      loadData: self.onLoadTableData,
      initialValue: [11, 3, 5],
    },
  },
  {
    title: 'Tables (pop-ups), echoes',
    name: 'field2',
    formItem: {
      type: 'table',
      rowKey: 'id',
      titleKey: 'name',
      dataSource,
      columns: innerColumns,
      onChange: (form, value, rows) => console.log('。。。:', value, rows),
      loadData: self.onLoadTableData,
      initialValue: [
        // If the initial value is an object array, it can be displayed in the field specified by the titleKey
        { id: 3, name: 'Tom' },
        { id: 5, name: 'Zhao Si' },
        { id: 11, name: 'Harry' },
      ],
    },
  },
  {
    title: 'Tables (inline)',
    name: 'field3',
    formItem: {
      type: 'table',
      modal: false,
      rowKey: 'id',
      dataSource,
      columns: innerColumns,
      onChange: (form, value, rows) => console.log('。。。:', value, rows),
      loadData: self.onLoadTableData,
      initialValue: [11, 3, 5],
    },
  },
];

export const columns12 = [
  {
    title: 'Radio',
    name: 'radio1',
    dict: [
      { code: '1', codeName: 'Hangzhou' },
      { code: '2', codeName: 'Shanghai' },
      { code: '3', codeName: 'Beijing' },
      { code: '4', codeName: 'Chengdu' },
    ],
    formItem: {
      type: 'radio',
    },
  },
  {
    title: 'Single Selection (Style)',
    name: 'radio2',
    dict: [
      { code: '1', codeName: 'Hangzhou' },
      { code: '2', codeName: 'Shanghai' },
      { code: '3', codeName: 'Beijing' },
      { code: '4', codeName: 'Chengdu' },
    ],
    formItem: {
      type: 'radio',
      buttonStyle: 'solid',
    },
  },
  {
    title: 'Check',
    name: 'radio3',
    dict: [
      { code: '1', codeName: 'Hangzhou' },
      { code: '2', codeName: 'Shanghai' },
      { code: '3', codeName: 'Beijing' },
      { code: '4', codeName: 'Chengdu' },
    ],
    formItem: {
      type: 'checkbox',
    },
  },
];

export const columns13Fun = (col = []) => {
  return [
    {
      title: 'name',
      name: 'name',
      formItem: {},
    },
    ...col
  ];
};
