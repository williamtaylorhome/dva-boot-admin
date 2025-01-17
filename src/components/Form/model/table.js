import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Select } from 'antd';
import DataTable from '../../DataTable';
import $$ from 'cmn-utils';
import isEqual from 'react-fast-compare';
import PageHelper from '@/utils/pageHelper';
import assign from 'object-assign';

const Pagination = DataTable.Pagination;
const Option = Select.Option;

/**
 *  formItem: {
      type: 'table',
      rowKey: 'id',
      dataSource,
      columns: innerColumns,
      onChange: (form, value) => console.log('。。。 :', value),
      loadData: self.onLoadTableData,
      initialValue: [11, 3, 5],
    }
 */
class TableControlled extends Component {
  static propTypes = {
    value: PropTypes.array,
    dataSource: PropTypes.object,
    onChange: PropTypes.func,
    loadData: PropTypes.func
  };

  static defaultProps = {
    rowKey: 'id',
    modal: {}
  };

  constructor(props) {
    super(props);
    const { value, dataSource } = props;
    this.state = {
      value: this.getKeys(value),
      rows: this.getRows(value),
      dataSource: dataSource || PageHelper.create(),
      visible: false,
      loading: false
    };
  }

  componentDidMount() {
    const { loadData } = this.props;
    if (loadData) {
      this.onChange({ pageNum: 1 });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { dataSource, value, loadData } = this.props;
    const { rows } = this.state;
    if (
      !isEqual(prevProps.dataSource, dataSource) ||
      !isEqual(prevProps.value, value)
    ) {
      const _value = this.getKeys(value);
      const newState = {
        value: _value,
        rows: this.getRows(_value, rows)
      };
      if (!loadData && dataSource) {
        newState.dataSource = dataSource;
      }

      this.setState(newState);
    }
  }

  // Convert the values to an array of pairs
  getRows(value, oldValue = []) {
    const { rowKey } = this.props;
    if (value) {
      return value.map(item => {
        const oldv = oldValue.filter(jtem => jtem[rowKey] === item)[0];
        return typeof item === 'object' ? item : oldv || { [rowKey]: item };
      });
    }
    return [];
  }

  getKeys(value) {
    const { rowKey } = this.props;
    if (value) {
      return value.map(item => ($$.isObject(item) ? item[rowKey] : item));
    }
    return [];
  }

  onSelect = (keys, rows) => {
    const { modal, onChange } = this.props;
    this.setState({ value: keys, rows });

    if (onChange && !modal) {
      onChange(keys, rows);
    }
  };

  async onChange({ pageNum, pageSize }) {
    const { loadData } = this.props;
    const { dataSource } = this.state;

    if (loadData) {
      this.setState({
        loading: true
      });

      const newDataSource = await loadData(
        dataSource.jumpPage(pageNum, pageSize)
      );

      this.setState({
        loading: false,
        dataSource: assign(dataSource, newDataSource)
      });
    }
  }

  onSelectChange = (value, option) => {
    const { rowKey, onChange } = this.props;
    const { rows } = this.state;
    const newRows = rows.filter(item => value.indexOf(item[rowKey]) !== -1);
    this.setState({
      value,
      rows: newRows
    });
    onChange && onChange(value, newRows);
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  onSubmit = () => {
    const { value, rows } = this.state;
    const { onChange } = this.props;
    this.hideModal();
    onChange && onChange(value, rows);
  };

  hideModal = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const {
      modal,
      columns,
      titleKey,
      rowKey,
      selectType,
      showNum,
      placeholder,
      getPopupContainer,
      disabled,
      pagination,
      ...otherProps
    } = this.props;
    const { dataSource, value, rows, loading, visible } = this.state;

    const dataTableProps = {
      loading,
      columns,
      rowKey,
      dataItems: dataSource,
      selectedRowKeys: value,
      selectType: typeof selectType === 'undefined' ? 'checkbox' : selectType,
      showNum: typeof showNum === 'undefined' ? true : showNum,
      isScroll: true,
      onChange: ({ pageNum, pageSize }) => this.onChange({ pageNum, pageSize }),
      onSelect: (keys, rows) => this.onSelect(keys, rows),
      pagination:
        pagination === false
          ? false
          : {
              showSizeChanger: false,
              showQuickJumper: false,
              ...pagination
            }
    };
    if (modal || disabled) {
      return (
        <div>
          <div onClick={disabled ? () => {} : this.showModal}>
            <Select
              readOnly
              disabled={!!disabled}
              mode="multiple"
              open={false}
              value={titleKey ? value : value.length ? '_selected' : []}
              onChange={this.onSelectChange}
              placeholder={placeholder}
            >
              {titleKey ? (
                rows.map(item => (
                  <Option key={item[rowKey]} value={item[rowKey]}>
                    {item[titleKey]}
                  </Option>
                ))
              ) : (
                <Option key="_selected" value="_selected">
                  Selected{rows.length}项
                </Option>
              )}
            </Select>
          </div>
          <Modal
            className="antui-table-modal"
            title={'Please select' + otherProps.title}
            visible={visible}
            width={modal.width || 600}
            onCancel={this.hideModal}
            footer={
              <>
                <div className="left">
                  {pagination === false ? null : (
                    <Pagination
                      key="paging"
                      size="small"
                      showSizeChanger={false}
                      showQuickJumper={false}
                      {...dataTableProps}
                    />
                  )}
                </div>
                <Button key="back" onClick={this.hideModal}>
                  Cancel
                </Button>
                <Button key="submit" type="primary" onClick={this.onSubmit}>
                submit
                </Button>
              </>
            }
            {...modal}
          >
            <DataTable {...dataTableProps} pagination={false} />
          </Modal>
        </div>
      );
    }

    return <DataTable {...dataTableProps} />;
  }
}

/**
 * TableForm component
 */
export default ({
  form,
  name,
  formFieldOptions = {},
  record,
  initialValue,
  rules,
  onChange,
  dataSource,
  normalize,
  rowKey,
  placeholder,
  ...otherProps
}) => {
  const { getFieldDecorator } = form;

  let initval = initialValue;

  if (record) {
    initval = record[name];
  }

  // If an initial value exists
  if (initval !== null && typeof initval !== 'undefined') {
    if ($$.isFunction(normalize)) {
      formFieldOptions.initialValue = normalize(initval);
    } else {
      formFieldOptions.initialValue = initval;
    }
  }

  // If there are rules
  if (rules && rules.length) {
    formFieldOptions.rules = rules;
  }

  // If needed on change
  if (typeof onChange === 'function') {
    formFieldOptions.onChange = (value, rows) => onChange(form, value, rows); // form, value
  }

  const props = {
    placeholder: placeholder || `请选择${otherProps.title}`,
    ...otherProps
  };

  return getFieldDecorator(name, formFieldOptions)(
    <TableControlled
      dataSource={dataSource}
      rowKey={rowKey || name}
      {...props}
    />
  );
};
