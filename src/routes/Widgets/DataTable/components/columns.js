import React, { Fragment } from 'react';
import DataTable, { EditableOper } from 'components/DataTable';
import Icon from 'components/Icon';
import { Button } from 'antd';
const Tip = DataTable.Tip;

export const columns1 = [
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
        <DataTable.Oper>
          <Button tooltip="revise">
            <Icon type="edit" />
          </Button>
          <Button tooltip="Delete">
            <Icon type="trash" />
          </Button>
        </DataTable.Oper>
      )
    }
  }
];

export const columns2 = [
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
    tableItem: {
      width: 200,
      render: text => <Tip>{text + text + text + text + text + text}</Tip>
    }
  }
];

export const columns3 = [
  {
    title: 'role',
    name: 'role',
    dict: [
      { code: '1', codeName: 'administrator' },
      { code: '2', codeName: 'visitor' },
      { code: '3', codeName: 'author' }
    ],
    tableItem: {}
  }
];

export const columns4 = [
  {
    title: 'name',
    name: 'name',
    tableItem: {}
  },
  {
    title: 'age',
    name: 'age',
    tableItem: {
      sorter: true
    }
  },
  {
    title: 'address',
    name: 'address',
    tableItem: {}
  }
];

export const columns5 = (self, editingKey) => [
  {
    title: 'name',
    name: 'name',
    tableItem: {
      type: 'input',
      editing: (text, record) => record.id === editingKey,
      rules: [{ required: true, message: 'Please enter a name!' }]
    }
  },
  {
    title: 'age',
    name: 'age',
    tableItem: {
      type: 'number',
      editing: (text, record) => record.id === editingKey
    }
  },
  {
    title: 'role',
    name: 'role',
    dict: [
      { code: '1', codeName: 'employee' },
      { code: '2', codeName: 'manger' },
      { code: '3', codeName: 'Mister' }
    ],
    tableItem: {
      type: 'select',
      editing: (text, record) => record.id === editingKey
    }
  },
  {
    title: 'operation',
    tableItem: {
      width: 180,
      render: (text, record) => (
        <EditableOper>
          {form =>
            record.id === editingKey ? (
              <Fragment>
                <a onClick={e => self.onSave(record, form)}>preservation</a>
                <a onClick={e => self.onCancelEdit()}>Cancel</a>
              </Fragment>
            ) : (
              <a onClick={e => self.onEdit(record)}>revise</a>
            )
          }
        </EditableOper>
      )
    }
  }
];

export const columns6 = [
  {
    title: 'name',
    name: 'name',
    tableItem: {
      width: 120,
      fixed: 'left'
    }
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
      width: 100,
      fixed: 'right',
      render: (text, record) => (
        <DataTable.Oper>
          <Button tooltip="revise">
            <Icon type="edit" />
          </Button>
          <Button tooltip="Delete">
            <Icon type="trash" />
          </Button>
        </DataTable.Oper>
      )
    }
  }
];