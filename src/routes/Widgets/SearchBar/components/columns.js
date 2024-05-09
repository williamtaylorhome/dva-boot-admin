import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';

export const columns1 = [
  {
    title: 'Role type',
    name: 'roleType',
    dict: [
      { code: '1', codeName: '111' },
      { code: '2', codeName: '222' },
      { code: '3', codeName: '333' }
    ],
    searchItem: {
      type: 'select'
    }
  },
  {
    title: 'Character name',
    name: 'roleName',
    searchItem: {}
  },
  {
    title: 'Introduction',
    name: 'order',
    searchItem: {
      type: 'number',
      min: 1,
      max: 99
    }
  }
];

export const columns2 = [
  {
    title: 'Character name',
    name: 'roleName',
    searchItem: {}
  },
  {
    title: 'Role type',
    name: 'roleType',
    dict: [
      { code: '1', codeName: '111' },
      { code: '2', codeName: '222' },
      { code: '3', codeName: '333' }
    ],
    searchItem: {
      type: 'select'
    }
  },
  {
    title: 'Introduction',
    name: 'order',
    searchItem: {
      type: 'number'
    }
  }
];

export const columns3 = [
  {
    title: 'Select a time',
    name: 'date1',
    searchItem: {
      type: 'date'
    }
  },
  {
    title: 'Select a time',
    name: 'date2',
    searchItem: {
      type: 'date~',
      width: 300,
      placeholder: ['This is the start time', 'This is the end time']
    }
  },
  {
    title: 'Select a time',
    name: 'date3',
    searchItem: {
      type: 'month'
    }
  }
];

export const columns4 = [
  {
    title: 'Condition 1',
    name: 'key1',
    searchItem: {}
  },
  {
    title: 'Condition 2',
    name: 'key2',
    searchItem: {}
  },
  {
    title: 'Condition 3',
    name: 'key3',
    searchItem: {}
  },
  {
    title: 'Condition 4',
    name: 'key4',
    searchItem: {}
  },
  {
    title: 'Condition 5',
    name: 'key5',
    searchItem: {}
  },
  {
    title: 'Condition 6',
    name: 'key6',
    searchItem: {}
  },
  {
    title: 'Condition 7',
    name: 'key7',
    searchItem: {}
  },
  {
    title: 'Condition 8',
    name: 'key8',
    searchItem: {}
  },
  {
    title: 'Condition 9',
    name: 'key9',
    searchItem: {}
  }
];

export const columns5 = [
  {
    title: 'address',
    name: 'key1',
    searchItem: {
      type: 'cascade',
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou'
            }
          ]
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing'
            }
          ]
        }
      ]
    }
  },
  {
    title: 'address1',
    name: 'key2',
    searchItem: {
      type: 'treeSelect',
      treeData: [
        {
          value: 'zhejiang',
          title: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              title: 'Hangzhou'
            }
          ]
        },
        {
          value: 'jiangsu',
          title: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              title: 'Nanjing'
            }
          ]
        }
      ]
    }
  }
];

export const columns6 = [
  {
    title: 'With icons',
    name: 'key',
    searchItem: {
      type: 'custom',
      render: (record, form) => {
        // ...
        const { getFieldDecorator } = form;
        return getFieldDecorator('userName', {
          rules: [{ required: true, message: 'Please enter a username!' }]
        })(
          <Input
            prefix={<UserOutlined style={{ fontSize: 13 }} />}
            placeholder="Username"
          />
        );
      }
    }
  }
];
