import React from 'react';
import PropTypes from 'prop-types';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Row, Col, Button, message } from 'antd';
import cx from 'classnames';
import $$ from 'cmn-utils';
import './style/index.less';
const createForm = Form.create;

const PlainComp = ({ className, children }) => (
  <div className={className}>{children}</div>
);
PlainComp.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};
/**
 * Search bar
 */
class SearchBar extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    /**
     * For details, please refer to the help documentation column.js usage
     */
    columns: PropTypes.array.isRequired,
    /**
     * Use the data of record to assign the value {key:value, key1: value1} to the form, and the initial value of the time type needs to be changed to the moment type
     */
    record: PropTypes.object,
    /**
     * Search bar type inline，grid
     */
    type: PropTypes.string,
    /**
     * Search criteria grouping, after setting this property, the search terms with the same group value will be filtered in the column.js
     */
    group: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * Same as the Row configuration in the Grid component in antd
     */
    rows: PropTypes.object,
    /**
     * Same as Col configuration in the Grid component in antd
     */
    cols: PropTypes.object,
    /**
     * Additional search terms
     */
    children: PropTypes.node,
    /**
     * How to deal with items with pop-up boxes in the form, such as drop-down boxes, drop-down trees, date selection, etc
     * If you set it to true, it will automatically attach to the form, or you can specify it with a function
     * For usage, see the getPopupContainer property of antd with pop-up component http://ant-design.gitee.io/components/select-cn/
     * appendTo={triggerNode => triggerNode.parentNode}
     */
    appendTo: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),

    form: PropTypes.object,

    /**
     * Click the Enquiry button onSearch(values, isReset) values Query the data isReset Whether it's a reset or not
     */
    onSearch: PropTypes.func
  };

  static defaultProps = {
    prefixCls: 'antui-searchbar',
    type: 'inline'
  };

  // If type is set to grid, specify the number of elements in each row
  cols = {
    xs: 8,
    md: 6,
    xl: 4
  };

  // Inline elements are wide by default
  width = {
    date: 100,
    month: 100,
    'date~': 280,
    datetime: 140,
    select: 100,
    default: 110,
    treeSelect: 110,
    cascade: 110,
    cascader: 110
  };

  // When type is grid, specify the interval for every two elements
  rows = {
    gutter: 8
  };

  resetForm(e) {
    this.props.form.resetFields();
    this.searchForm(true);
  }

  searchForm(isReset) {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        let errs = [];
        Object.keys(errors).forEach(fieldName => {
          errs = errors[fieldName].errors || [];
        });
        if (errs && errs.length) message.error(errs[0].message);
        return;
      }

      this.props.onSearch && this.props.onSearch(values, isReset);
    });
  }

  render() {
    const {
      className,
      prefixCls,
      type,
      rows,
      cols,
      columns,
      group,
      children,
      form,
      appendTo,
      record,
      ...otherProps
    } = this.props;

    const colopts = type === 'grid' ? cols || this.cols : {};
    const rowopts = type === 'grid' ? rows || this.rows : {};

    let ComponentRow = type === 'inline' ? PlainComp : Row;
    let ComponentCol = type === 'inline' ? PlainComp : Col;
    let ComponentItem = type === 'inline' ? PlainComp : Form.Item;
    const formItemLayout =
      type === 'grid'
        ? {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 }
          }
        : {};

    let ComponentBtnGroup = type === 'inline' ? Button.Group : PlainComp;

    let searchFields = columns.filter(col => col.searchItem);
    searchFields = group
      ? searchFields.filter(
          col => col.searchItem && col.searchItem.group === group
        )
      : searchFields;

    if (!searchFields.length) return null;

    delete otherProps.onSearch;

    let getPopupContainer = null;
    if (appendTo) {
      if ($$.isFunction(appendTo)) getPopupContainer = appendTo;
      else if (appendTo === true)
        getPopupContainer = triggerNode => triggerNode.parentNode;
      else getPopupContainer = _ => appendTo;
    }

    return (
      <div className={cx(prefixCls, className)} {...otherProps}>
        <Form
          className={cx({
            'form-inline': type === 'inline',
            'form-grid': type === 'grid'
          })}
        >
          <ComponentRow className="row-item" {...rowopts}>
            {searchFields.map((field, i) => {
              let col = { ...colopts };
              if (type === 'grid' && field.searchItem.col) {
                col = field.searchItem.col;
              } else if (type !== 'grid') {
                col = {};
              }

              const fieldType = field.searchItem.type || 'input';

              const formProps = {
                form,
                name: field.name,
                title: field.title,
                record,
                ...field.searchItem
              };

              if (type === 'inline') {
                formProps.style = {
                  width: formProps.width || this.width[fieldType]
                };
              }

              if (getPopupContainer) {
                formProps.getPopupContainer = getPopupContainer;
              }

              if (field.dict) {
                formProps.dict = field.dict;
              }

              let FieldComp;
              switch (fieldType) {
                case 'date~': // Date range
                case 'datetime': // Date & Time
                case 'date': // date
                case 'month': // moon
                case 'time': // Time
                  FieldComp = require(`../Form/model/date`).default(formProps);
                  break;
                case 'input': // input box
                case 'textarea': // Multi-line text
                  formProps.formFieldOptions = {
                    rules: [
                      {
                        pattern: /^[^'%&<>=?*!]*$/,
                        message: '查询条件中不能包含特殊字符'
                      }
                    ]
                  };
                  formProps.maxLength = field.searchItem.maxLength || 100;
                  formProps.autoComplete = 'off';
                  FieldComp = require(`../Form/model/input`).default(formProps);
                  break;
                case 'hidden': // Hide domains
                  return (
                    <span key={`col-${i}`}>
                      {require(`../Form/model/input`).default(formProps)}
                    </span>
                  );
                case 'select':
                  formProps.optionFilterProp = 'children';
                // eslint-disable-next-line no-fallthrough
                case 'treeSelect':
                case 'cascade':
                  formProps.allowClear = true;
                  formProps.showSearch = true;
                // eslint-disable-next-line no-fallthrough
                default:
                  // general
                  FieldComp = require(`../Form/model/${fieldType.toLowerCase()}`).default(
                    formProps
                  );
              }

              return (
                <ComponentCol key={`col-${i}`} className="col-item" {...col}>
                  <ComponentItem
                    {...formItemLayout}
                    label={field.title}
                    className="col-item-content"
                  >
                    {FieldComp}
                  </ComponentItem>
                </ComponentCol>
              );
            })}
            {children}
          </ComponentRow>
          <ComponentBtnGroup className="search-btns">
            <Button
              title="search"
              type={type === 'grid' ? 'primary' : 'default'}
              onClick={e => this.searchForm()}
              htmlType="submit"
              icon={<SearchOutlined />}
            >
              search
            </Button>
            <Button title="reset" onClick={e => this.resetForm()} icon={<ReloadOutlined />}>
            reset
            </Button>
          </ComponentBtnGroup>
        </Form>
      </div>
    );
  }
}

export default createForm()(SearchBar);
