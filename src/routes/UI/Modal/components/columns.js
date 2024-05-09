import React from 'react';
import { Oper } from 'components/DataTable';
import Icon from 'components/Icon';
import { Button } from 'antd';

export default [
  {
    title: 'name',
    name: 'name',
    tableItem: {}
  },
  {
    title: 'age',
    name: 'age',
    tableItem: {}
  },
  {
    title: 'address',
    name: 'address',
    tableItem: {}
  },
  {
    title: 'operation',
    tableItem: {
      width: 180,
      render: (text, record) => (
        <Oper>
          <Button tooltip="revise">
            <Icon type="edit" />
          </Button>
          <Button tooltip="Delete">
            <Icon type="trash" />
          </Button>
        </Oper>
      )
    }
  }
];