import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Editor from '../../Editor';
import $$ from 'cmn-utils';
import omit from 'object.omit';

class EditorControlled extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
  };

  constructor(props) {
    super(props);
    const { value } = props;
    this.state = {
      value
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.value !== prevProps.value) {
      this.setState({ value: this.props.value });
    }
  }

  triggerChange = value => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(value);
    }
  };

  render() {
    const { value } = this.state;
    const otherProps = omit(this.props, 'value');

    return (
      <Editor value={value} onChange={this.triggerChange} {...otherProps} />
    );
  }
}

/**
 * EditorForm component
 */
export default ({
  form,
  name,
  formFieldOptions = {},
  record,
  initialValue,
  rules,
  onChange,
  normalize,
  preview,
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

  if (preview) {
    return (
      <div
        style={otherProps.style}
        dangerouslySetInnerHTML={{ __html: initval || '' }}
      />
    );
  }

  // If there are rules
  if (rules && rules.length) {
    formFieldOptions.rules = rules;
  }

  // If needed on change
  if (typeof onChange === 'function') {
    formFieldOptions.onChange = value => onChange(form, value); // form, value
  }

  return getFieldDecorator(name, formFieldOptions)(
    <EditorControlled {...otherProps} />
  );
};
