import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Select } from 'antd';
import TransferTree from '../../TransferTree';
import $$ from 'cmn-utils';
const Option = Select.Option;

/**
 *  formItem: {
      type: 'transfer',
      modal: true,
      dataSource: employees,
      normalize: (value) => value.map(item => item.key)
    }
 */
class TransferTreeControlled extends Component {
  static propTypes = {
    value: PropTypes.array,
    dataSource: PropTypes.array,
    onChange: PropTypes.func
  };

  constructor(props) {
    super(props);
    const { value, dataSource } = props;
    this.state = {
      value: value,
      dataSource: dataSource,
      visible: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.value !== prevProps.value) {
      this.setState({ value: this.props.value });
    }
  }

  triggerChange = (targetKeys, targetNodes) => {
    const { modal, onChange } = this.props;
    this.setState({ value: targetNodes });

    if (onChange && !modal) {
      onChange(targetNodes);
    }
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  hideModal = () => {
    this.setState({
      visible: false
    });
  };

  onSelectChange = (value, option) => {
    const { onChange } = this.props;
    this.setState({
      value
    });
    onChange && onChange(value);
  };

  render() {
    const { modal, placeholder, ...otherProps } = this.props;
    const { dataSource, value } = this.state;
    const comp = (
      <TransferTree
        {...otherProps}
        dataSource={dataSource}
        targetNodes={value}
        onChange={this.triggerChange}
      />
    );

    if (modal || otherProps.disabled) {
      return (
        <div>
          <div onClick={otherProps.disabled ? () => {} : this.showModal}>
            <Select
              readOnly
              disabled={!!otherProps.disabled}
              mode="multiple"
              open={false}
              value={otherProps.value}
              onChange={this.onSelectChange}
              placeholder={placeholder}
            >
              {otherProps.value &&
                dataSource
                  .filter(item => otherProps.value.indexOf(item.key) !== -1)
                  .map(item => (
                    <Option key={item.key} value={item.key}>
                      {item.title || item.label}
                    </Option>
                  ))}
            </Select>
          </div>
          <Modal
            className="antui-transfer-modal"
            title={'Please select' + otherProps.title}
            visible={this.state && this.state.visible}
            width={modal.width || 480}
            onOk={this.hideModal}
            onCancel={this.hideModal}
            okText="Are you sure"
            cancelText="Cancel"
            {...modal}
          >
            {comp}
          </Modal>
        </div>
      );
    }

    return comp;
  }
}

/**
 * TransferTreeForm subassembly
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
  placeholder,
  getPopupContainer,
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

  // If there is rules
  if (rules && rules.length) {
    formFieldOptions.rules = rules;
  }

  // If needed onChange
  if (typeof onChange === 'function') {
    formFieldOptions.onChange = value => onChange(form, value); // form, value
  }

  const props = {
    placeholder: placeholder || `Please select${otherProps.title}`,
    ...otherProps
  };

  return getFieldDecorator(name, formFieldOptions)(
    <TransferTreeControlled dataSource={dataSource} {...props} />
  );
};
