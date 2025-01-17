import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LoadingOutlined } from '@ant-design/icons';
import { AutoComplete, Input } from 'antd';
import $$ from 'cmn-utils';
import omit from 'object.omit';
import isEqual from 'react-fast-compare';
const Option = AutoComplete.Option;

class AutoCompleteControlled extends Component {
  static propTypes = {
    value: PropTypes.any,
    dataSource: PropTypes.array,
    onChange: PropTypes.func,
    keyField: PropTypes.string,
    valueField: PropTypes.string,
    render: PropTypes.func,
    renderItem: PropTypes.func
  };

  constructor(props) {
    super(props);
    const { value, loadData } = props;
    this.state = {
      value: value,
      dataSource: [],
      loading: false
    };

    this.handleSearch = loadData ? $$.debounce(this._handleSearch, 500) : null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { loadData } = this.props;
    if (
      !isEqual(this.props.dataSource, prevProps.dataSource) ||
      !isEqual(this.props.value, prevProps.value)
    ) {
      const newState = { value: this.props.value };
      if (!loadData && this.props.dataSource) {
        newState.dataSource = this.props.value ? this.props.dataSource : [];
      }

      this.setState(newState);
    }
  }

  onSearch = value => {
    const { onChange, loadData } = this.props;
    if (onChange) {
      onChange(value, {});
    }
    if (!value.trim()) {
      this.setState({
        dataSource: [],
        value
      });
      return;
    } else {
      this.setState({
        value
      });
    }

    if (loadData) {
      this.handleSearch(value);
    }
  };

  _handleSearch = value => {
    const { loadData } = this.props;

    // this.setState({ loading: true }); // input suffix Attributes, when entered, cause an input break
    const promise = loadData(value);
    if (promise && promise.then) {
      promise
        .then(listItem => {
          this.setState({
            dataSource: listItem,
            loading: false
          });
        })
        .catch(e =>
          this.setState({
            dataSource: [],
            loading: false
          })
        );
    }
  };

  renderOptions = dataSource => {
    const { render, renderItem } = this.props;
    if (render) return render(dataSource) || [];
    else if (renderItem) {
      return dataSource.map(this.renderOptionItem);
    } else {
      return dataSource;
    }
  };

  renderOptionItem = (item, index) => {
    const { keyField, renderItem } = this.props;
    return (
      <Option key={item[keyField] || index} {...item}>
        {renderItem(item)}
      </Option>
    );
  };

  onSelect = (value, option) => {
    const onChange = this.props.onChange;
    if (onChange) {
      const { valueField, optionLabelProp } = this.props;
      const itemProps = option.props;
      const valueKey = valueField || optionLabelProp;
      const rvalue = itemProps[valueKey] || value;
      onChange(rvalue, option);
    }
  };

  render() {
    const { value, dataSource, loading } = this.state;
    const { valueField } = this.props;
    const autoComponentProps = omit(this.props, [
      'value',
      'dataSource',
      'onChange'
    ]);
    return (
      <AutoComplete
        value={value}
        defaultActiveFirstOption={false}
        dataSource={this.renderOptions(dataSource)}
        onSelect={this.onSelect}
        onChange={this.onSearch}
        optionLabelProp={valueField}
        {...autoComponentProps}
        allowClear={false}
      >
        <Input
          suffix={
            loading ? (
              <LoadingOutlined className="auto-complete-loading" />
            ) : null
          }
        />
      </AutoComplete>
    );
  }
}

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
  getPopupContainer,
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
    formFieldOptions.onChange = (value, option) =>
      onChange(form, value, option); // form, value, option Selected items
  }

  const props = {
    placeholder: placeholder || `Please enter${otherProps.title}`,
    ...otherProps
  };

  if (getPopupContainer) {
    props.getPopupContainer = getPopupContainer;
  }

  return getFieldDecorator(
    name,
    formFieldOptions
  )(<AutoCompleteControlled dataSource={dataSource} {...props} />);
};
