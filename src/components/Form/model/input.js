import React from 'react';
import { Input } from 'antd';
import $$ from 'cmn-utils';
const { TextArea } = Input;
/**
 * Text box symbol
 */
export default ({
  form,
  name,
  formFieldOptions = {},
  record,
  initialValue,
  normalize,
  rules,
  onChange,
  type,
  preview,
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

  if (preview) {
    if (type === 'hidden') return null;
    return <div style={otherProps.style}>{initval || ''}</div>;
  }

  // If there are rules
  if (rules && rules.length) {
    formFieldOptions.rules = rules;
  }

  // If needed on change
  if (typeof onChange === 'function') {
    formFieldOptions.onChange = e => onChange(form, e.target.value, e); // form, value, event
  }

  const Comp = type === 'textarea' ? TextArea : Input;

  delete otherProps.render;

  const props = {
    autoComplete: 'off',
    type,
    placeholder: placeholder || `Please enter${otherProps.title}`,
    ...otherProps
  };

  return getFieldDecorator(name, formFieldOptions)(<Comp {...props} />);
};
