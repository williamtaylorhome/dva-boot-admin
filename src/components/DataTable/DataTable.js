import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination, Tooltip } from 'antd';
import objectAssign from 'object-assign';
import isEqual from 'react-fast-compare';
import { EditableCell } from './Editable';
import $$ from 'cmn-utils';
import cx from 'classnames';
import './style/index.less';

/**
 * Data tables
 */
class DataTable extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    rowKey: PropTypes.string,
    /**
     * For details, please refer to the help documentation column.js usage
     */
    columns: PropTypes.array.isRequired,
    /**
     * The data object list is required, and if you need the table to come with pagination, you need to provide pagination information here {pageNum:1, list:[], filters:{}, pageSize:10, total:12}
     */
    dataItems: PropTypes.object.isRequired,
    /**
     * Whether or not to display the line number
     */
    showNum: PropTypes.bool,
    /**
     * Whether the odd or even rows are of different colors
     */
    alternateColor: PropTypes.bool,
    /**
     * Multiple/Single,checkbox or radio
     */
    selectType: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    /**
     * For details about the configuration of the selection function, see the rowSelection configuration item of antd
     */
    rowSelection: PropTypes.object,
    /**
     * Specifies an array of keys for the selection
     */
    selectedRowKeys: PropTypes.array,
    /**
     * Whether it has a scroll bar, or as a scroll parameter
     */
    isScroll: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    /**
     * Whether to add pagination in the table
     */
    pagination: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    /**
     * Select the table row callback function(selectedRowKeys, selectedRows)
     */
    onSelect: PropTypes.func,
    /**
     * External API for obtaining data {pageNum:1, filters:{}, pageSize:10}
     */
    onChange: PropTypes.func
  };

  static defaultProps = {
    prefixCls: 'antui-datatable',
    alternateColor: true
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedRowKeys: props.selectedRowKeys,
      selectedRows: this.getSelectedRows(props.selectedRowKeys),
      tableHeight: null
    };
  }

  // Convert the values to an array of pairs
  getSelectedRows(value, oldValue = [], rowKey) {
    if (value) {
      return value.map(item => {
        if (typeof item === 'object') {
          return item;
        } else {
          const oldv = oldValue.filter(jtem => jtem[rowKey] === item)[0];
          return oldv || { [rowKey]: item };
        }
      });
    }
    return [];
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(prevProps.selectedRowKeys, this.props.selectedRowKeys)) {
      this.setState({
        selectedRowKeys: this.props.selectedRowKeys,
        selectedRows: this.getSelectedRows(
          this.props.selectedRowKeys,
          prevState.selectedRows,
          this.props.rowKey
        )
      });
    }
  }

  tableOnRow = (record, index) => {
    const { selectType } = this.props;

    let keys = selectType === 'radio' ? [] : this.state.selectedRowKeys || [];
    let rows = selectType === 'radio' ? [] : this.state.selectedRows || [];

    let i = keys.indexOf(record[this._rowKey]);
    if (i !== -1) {
      keys.splice(i, 1);
      rows.splice(i, 1);
    } else {
      keys.push(record[this._rowKey]);
      rows.push(record);
    }

    this.onSelectChange([...keys], [...rows]);
  };

  onSelectChange = (selectedRowKeys, selectedRows) => {
    // Use keys to re-filter rows, and use the key to resolve the problem that keys and rows are out of sync
// and add a rowKey field to each row
    selectedRows = selectedRows.filter(
      item => selectedRowKeys.indexOf(item[this._rowKey]) !== -1
    );

    this.setState({ selectedRowKeys, selectedRows }, () => {
      this.props.onSelect && this.props.onSelect(selectedRowKeys, selectedRows);
    });
  };

  handleTableChange = (pagination, filters, sorter) => {
    let pageNum = pagination.current || pagination;

    let sortMap = sorter.field
      ? {
          [sorter.field]: sorter.order === 'ascend' ? 'asc' : 'desc'
        }
      : sorter;
    this.props.onChange &&
      this.props.onChange({ pageNum, filters, sorter: sortMap });
  };

  onShowSizeChange = (pageNum, pageSize) => {
    this.props.onChange && this.props.onChange({ pageNum, pageSize });
  };

  render() {
    const {
      prefixCls,
      className,
      columns,
      dataItems,
      showNum,
      alternateColor,
      onChange,
      selectType,
      rowSelection,
      isScroll,
      pagination,
      rowKey,
      ...otherProps
    } = this.props;

    let classname = cx(prefixCls, className, {
      'table-row-alternate-color': alternateColor
    });

    let colRowKey = '';
    let hasLeftFixedCol = false; // Whether there is a fixed column on the left
// Default width
    let cols = columns
      .filter(col => {
        if (col.primary) colRowKey = col.name;
        if (col.tableItem) {
          return true;
        } else {
          return false;
        }
      })
      .map(col => {
        let item = col.tableItem;
        // Select dictionary enhancement
        if (col.dict && !item.render) {
          item.render = (text, record) => {
            return (
              col.dict &&
              col.dict
                .filter(dic => dic.code === text)
                .map(dic => dic.codeName)[0]
            );
          };
        }
        // Whether there is a fixed column on the left
        if (item.fixed === true || item.fixed === 'left') {
          hasLeftFixedCol = true;
        }
        // If a type field is specified, the column is rendered with the specified type
        const myRender = item.render;
        if (item.type) {
          item.render = (text, record, index) => {
            if ($$.isFunction(item.editing) && item.editing(text, record)) {
              return (
                <EditableCell
                  text={text}
                  record={record}
                  index={index}
                  field={col}
                />
              );
            } else {
              return $$.isFunction(myRender)
                ? myRender(text, record, index)
                : text;
            }
          };
        }
        return {
          title: col.title,
          dataIndex: col.name,
          ...item
        };
      })

    // Displays the line number
    if (showNum) {
      cols.unshift({
        title: '序号',
        width: 50,
        dataIndex: '_num',
        ...(hasLeftFixedCol && { fixed: 'left' }),
        render(text, record, index) {
          const { pageNum, pageSize } = dataItems;
          if (pageNum && pageSize) {
            return (pageNum - 1) * pageSize + index + 1;
          } else {
            // There is no pagination
            return index + 1;
          }
        }
      });
    }

    // Pagination
    const paging = objectAssign(
      {
        total: dataItems.total,
        pageSize: dataItems.pageSize,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => `共 ${total} 条`,
        onShowSizeChange: this.onShowSizeChange
      },
      dataItems.pageNum && { current: dataItems.pageNum },
      pagination
    );

    const _rowSelection = {
      type: selectType === 'radio' ? 'radio' : 'checkbox',
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange,
      ...rowSelection
    };

    this._rowKey = rowKey || colRowKey;

    return (
      <div className={classname}>
        <Table
          size="small"
          rowSelection={selectType ? _rowSelection : null}
          onRow={
            selectType
              ? (record, index) => ({
                  onClick: _ => this.tableOnRow(record, index)
                })
              : () => {}
          }
          scroll={isScroll ? objectAssign({ x: '100%' }, isScroll) : {}}
          bodyStyle={{ overflowX: 'auto' }}
          columns={cols}
          pagination={pagination ? paging : false}
          dataSource={dataItems.list}
          onChange={this.handleTableChange}
          rowKey={this._rowKey}
          {...otherProps}
        />
      </div>
    );
  }
}

/**
 * Action zone prevents bubbling upwards
 */
export const Oper = prop => (
  <div className="table-row-button" onClick={e => e.stopPropagation()}>
    {prop.children}
  </div>
);

export const Tip = prop => (
  <Tooltip placement="topLeft" title={prop.children}>
    <div className="nobr" style={prop.style}>
      {prop.children}
    </div>
  </Tooltip>
);

export const Paging = ({ dataItems, onChange, ...otherProps }) => {
  const { total, pageSize, pageNum } = dataItems;
  const paging = {
    total: total,
    pageSize: pageSize,
    current: pageNum,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: total => `共 ${total} 条`,
    onShowSizeChange: (pageNum, pageSize) => onChange({ pageNum, pageSize }),
    onChange: pageNum => onChange({ pageNum }),
    ...otherProps
  };
  return <Pagination {...paging} />;
};

DataTable.Oper = Oper;
DataTable.Pagination = Paging;
DataTable.Tip = Tip;

export default DataTable;
