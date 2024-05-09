import React from 'react';
import { TreeSelect } from 'antd';
import $$ from 'cmn-utils';

/**
 * Drop-down tree menu symbols
 */
export const TreeSelectForm = ({
  form,
  name,
  formFieldOptions = {},
  children,
  record,
  initialValue,
  normalize,
  rules,
  onChange,
  getPopupContainer,
  placeholder,
  ...otherProps
}) => {
  // --
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
    formFieldOptions.onChange = (value, label, extra) =>
      onChange(form, value, label, extra); // form, value
  }

  const props = {
    placeholder: placeholder || `Please select${otherProps.title}`,
    ...otherProps
  };

  if (getPopupContainer) {
    props.getPopupContainer = getPopupContainer;
  }

  return getFieldDecorator(name, formFieldOptions)(
    <TreeSelect {...props} />
  );
};

export default TreeSelectForm;
