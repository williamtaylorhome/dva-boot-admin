import React from 'react';
import { Radio } from 'antd';
import $$ from 'cmn-utils';
const RadioGroup = Radio.Group;
/**
 * Radio box
 */
export default ({
  form,
  name,
  dict = [],
  formFieldOptions = {},
  record,
  initialValue,
  rules,
  onChange,
  normalize,
  buttonStyle,
  getPopupContainer,
  preview,
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

  // Preview view
  if (preview) {
    const dictObj = dict.filter(item => item.code === initval)[0];
    let text = '';
    if (dictObj) {
      text = dictObj.codeName;
    }
    return <div style={otherProps.style}>{text}</div>;
  }

  // If there are rules
  if (rules && rules.length) {
    formFieldOptions.rules = rules;
  }

  // If needed on change
  if (typeof onChange === 'function') {
    formFieldOptions.onChange = e => onChange(form, e.target.value, e); // form, value
  }

  let RadioComp = Radio;
  if (buttonStyle === 'solid') RadioComp = Radio.Button;

  return getFieldDecorator(name, formFieldOptions)(
    <RadioGroup {...otherProps}>
      {dict.map((dic, i) => (
        <RadioComp key={dic.code} value={dic.code} title={dic.codeName}>
          {dic.codeName}
        </RadioComp>
      ))}
    </RadioGroup>
  );
};
