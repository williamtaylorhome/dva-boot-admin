import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';
import { router } from 'dva';
const { Link } = router;

export default (self, employees) => [
  {
    title: 'The name of the organization',
    name: 'deptName',
    tableItem: {},
    searchItem: {
      group: 'abc'
    },
    formItem: {}
  },
  {
    title: 'Power distribution network',
    name: 'distributionNetwork',
    dict: [{ code: '0', codeName: '城市' }, { code: '1', codeName: '乡村' }],
    tableItem: {},
    formItem: {
      type: 'select'
    },
    searchItem: {
      type: 'select'
    }
  },
  {
    title: 'Place of operation',
    name: 'address',
    tableItem: {},
    formItem: {},
    searchItem: {}
  },
  {
    title: 'The type of job',
    name: 'type',
    tableItem: {},
    formItem: {},
    searchItem: {}
  },
  {
    title: 'Start time',
    name: 'planBeginTime',
    tableItem: {},
    formItem: {
      type: 'datetime'
    },
    searchItem: {
      type: 'datetime'
    }
  },
  {
    title: 'Completion time',
    name: 'planEndTime',
    tableItem: {},
    formItem: {
      type: 'datetime'
    },
    searchItem: {
      type: 'datetime'
    }
  },
  {
    title: 'Personnel on duty',
    name: 'workEmployee',
    tableItem: {
      render: text => text.map(item => item.title).join(',')
    },
    formItem: {
      type: 'transfer',
      modal: true,
      dataSource: employees,
      normalize: value => value.map(item => item.key)
    }
  },
  {
    title: 'Job content',
    name: 'content',
    formItem: {
      type: 'editor'
    }
  },
  {
    title: 'operation',
    tableItem: {
      width: 180,
      render: (text, record) => (
        <DataTable.Oper>
          <Button tooltip="revise" onClick={e => self.onUpdate(record)}>
            <Icon type="edit" />
          </Button>
          <Button tooltip="Delete" onClick={e => self.onDelete(record)}>
            <Icon type="trash" />
          </Button>
          <Button tooltip="Jump to a new route">
            <Link to={"/crud/detail?id=" + record.id}>
              <Icon type="LinkOutlined" antd />
            </Link>
          </Button>
        </DataTable.Oper>
      )
    }
  }
];
