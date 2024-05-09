import React from 'react';
import PropTypes from 'prop-types';
import { CheckOutlined, ReloadOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Row, Col, Button, Divider } from 'antd';
import cx from 'classnames';
import objectAssign from 'object-assign';
import $$ from 'cmn-utils';
import omit from 'object.omit';
import Password from './model/password';
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
 * Form components
 */
class FormComp extends React.Component {
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
     * The type of form inline，grid
     */
    type: PropTypes.string,
    /**
     * Search criteria grouping, after setting this property, the search terms with the same group value will be filtered in the column.js
     */
    group: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * How to deal with items with pop-up boxes in the form, such as drop-down boxes, drop-down trees, date selection, etc
     * If you set it to true, it will automatically attach to the form, or you can specify it with a function
     * For usage, see the getPopupContainer property of antd with pop-up component http://ant-design.gitee.io/components/select-cn/
     * appendTo={triggerNode => triggerNode.parentNode}
     */
    appendTo: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    /**
     * Same as the Row configuration in the Grid component in antd
     */
    rows: PropTypes.object,
    /**
     * Same as Col configuration in the Grid component in antd
     */
    cols: PropTypes.object,
    /**
     * Additional form items
     */
    children: PropTypes.node,
    /**
     * antd's form object
     */
    form: PropTypes.object,
    /**
     * Click the Enquiry button onSubmit(values) values Submit data
     */
    onSubmit: PropTypes.func,

    /**
     * Whether it is a preview view, all form items will be displayed in text mode
     */
    preview: PropTypes.bool,

    /** antd formItemLayout*/
    formItemLayout: PropTypes.object,
    layout: PropTypes.object, // same form item layout

    /**
     * Whether it is in the Committing status
     */
    loading: PropTypes.bool,

    /**
     * Whether to display the bottom button, or pass in a custom bottom button
     */
    footer: PropTypes.oneOfType([PropTypes.bool, PropTypes.node])
  };

  static defaultProps = {
    prefixCls: 'antui-form',
    type: 'grid',
    loading: false,
    formItemLayout: {
      labelCol: { span: 6 },
      wrapperCol: { span: 17 }
    }
  };

  // If type is set to grid, specify the number of elements in each row
  cols = {
    xs: 24,
    md: 24,
    xl: 24
  };

  // Inline elements are wide by default
  width = {
    date: 100,
    month: 100,
    'date~': 280,
    datetime: 140,
    select: 100,
    default: 100,
    treeSelect: 110,
    cascade: 110,
    cascader: 110
  };

  // When type is grid, specify the interval for every two elements
  rows = {
    gutter: 8
  };

  onReset = e => {
    this.props.form.resetFields();
  };

  onSubmit = e => {
    e.preventDefault();
    const { form, record, onSubmit } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        onSubmit && onSubmit(values, record);
      }
    });
  };

  render() {
    const {
      className,
      prefixCls,
      type,
      rows,
      cols,
      formItemLayout: _formItemLayout,
      layout,
      appendTo,
      columns,
      record,
      group,
      children,
      form,
      preview,
      loading,
      footer,
      ...otherProps
    } = this.props;

    delete otherProps.onSubmit;

    let classname = cx(prefixCls, className, {
      'form-inline': type === 'inline',
      'form-grid': type === 'grid',
      preview: preview
    });

    const colopts = type === 'grid' ? cols || this.cols : {};
    const rowopts = type === 'grid' ? rows || this.rows : {};

    let ComponentRow = type === 'inline' ? PlainComp : Row;
    let ComponentCol = type === 'inline' ? PlainComp : Col;
    let ComponentItem = Form.Item;

    let formFields = columns.filter(col => col.formItem);
    formFields = group
      ? formFields.filter(col => col.formItem && col.formItem.group === group)
      : formFields;

    let getPopupContainer = null;
    if (appendTo) {
      if ($$.isFunction(appendTo)) getPopupContainer = appendTo;
      else if (appendTo === true)
        getPopupContainer = triggerNode => triggerNode.parentNode;
      else getPopupContainer = _ => appendTo;
    }

    return (
      <Form
        className={classname}
        onSubmit={this.onSubmit}
        {...objectAssign(otherProps, type === 'inline' && { layout: 'inline' })}
      >
        <ComponentRow className="row-item" {...rowopts}>
          {formFields.map((field, i) => {
            // Specify the column size, changing this value will change the number of elements in each row
            let col = { ...colopts };
            if (type === 'grid' && field.formItem.col) {
              col = field.formItem.col;
            } else if (type !== 'grid') {
              col = {};
            }

            let formItemLayout = { ..._formItemLayout, ...layout };
            if (
              type === 'grid' &&
              (field.formItem.formItemLayout || field.formItem.layout)
            ) {
              formItemLayout = {
                ...formItemLayout,
                ...field.formItem.formItemLayout,
                ...field.formItem.layout
              };
            } else if (type !== 'grid') {
              formItemLayout = {};
            }

            const fieldType = field.formItem.type || 'input';

            let formProps = {
              form,
              name: field.name,
              title: field.title,
              record,
              preview,
              ...field.formItem
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

            // Remove useless attributes before passing in the subcomponent
            formProps = omit(formProps, ['formItemLayout', 'layout', 'col']);

            let FieldComp;
            switch (fieldType) {
              case 'date~': // Date range
              case 'datetime': // Date & Time
              case 'date': // date
              case 'month': // moon
              case 'time': // Time
                FieldComp = require(`./model/date`).default(formProps);
                break;
              case 'input': // input box
              case 'textarea': // Multi-line text
                FieldComp = require(`./model/input`).default(formProps);
                break;
              case 'hidden': // Hide domains
                return (
                  <span key={`col-${i}`}>
                    {require(`./model/input`).default(formProps)}
                  </span>
                );
              case 'line': // Dividers
                const lineProps = omit(formProps, 'type');
                return (
                  <Divider key={`col-${i}`} {...lineProps}>
                    {formProps.title}
                  </Divider>
                );
              case 'password': // password
                return (
                  <Password
                    key={`col-${i}`}
                    formItemLayout={formItemLayout}
                    col={col}
                    {...formProps}
                  />
                );
              default:
                // general
                FieldComp = require(`./model/${fieldType.toLowerCase()}`).default(
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
          {footer === undefined ? (
            <ComponentCol className="form-btns col-item" {...colopts}>
              <Button
                title="submit"
                type="primary"
                htmlType="submit"
                icon={<CheckOutlined />}
                loading={loading}
              >
                submit
              </Button>
              <Button title="reset" onClick={e => this.onReset()} icon={<ReloadOutlined />}>
              reset
              </Button>
            </ComponentCol>
          ) : (
            footer
          )}
        </ComponentRow>
      </Form>
    );
  }
}

export const Item = Form.Item;

export default createForm()(FormComp);
