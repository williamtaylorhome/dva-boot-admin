import React from 'react';
import Icon from 'components/Icon';
import { Button } from 'antd';
import Upload from '../../Upload';
import $$ from 'cmn-utils';
/**
 * Upload a component, you may need to handle the inverted value yourself if FormData is required in the background
 * const formData = new FormData();
   fileList.forEach((file) => {
     formData.append('files[]', file);
   });
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
  renderUpload,
  btnIcon = 'UploadOutlined',
  max,
  maxFileSize, // Maximum file size
  fileTypes, // File types are allowed
  action, // Background address
  fileName, // antd upload, because name is used by formItem, the file name uploaded to the backend
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
    return <div style={otherProps.style}>{initval || ''}</div>;
  }

  // If there are rules
  if (rules && rules.length) {
    formFieldOptions.rules = rules;
  }

  if (maxFileSize || fileTypes) {
    formFieldOptions.rules = [
      {
        validator: (rule, value, callback) => {
          validatorFileSize(maxFileSize, value, callback);
          validatorFileTypes(fileTypes, value, callback);
          callback();
        }
      },
      ...(formFieldOptions.rules || [])
    ];
  }

  // If needed on change
  if (typeof onChange === 'function') {
    formFieldOptions.onChange = args => onChange(form, args); // form, args
  }

  let uploadProps = {
    beforeUpload: file => false,
    ...otherProps
  };

  // Upload to the background
  if (action) {
    uploadProps = otherProps;
    uploadProps.action = action;
    uploadProps.name = fileName || 'file';
  }

  return getFieldDecorator(name, {
    valuePropName: 'fileList',
    getValueFromEvent: normFile,
    ...formFieldOptions
  })(
    <Upload {...uploadProps}>
      {renderUpload ? (
        renderUpload(form, record, isDisabled(max, form.getFieldValue(name)))
      ) : (
        <Button
          icon={<Icon type={btnIcon} antd/>}
          disabled={isDisabled(max, form.getFieldValue(name))}
        >
          Click Upload
        </Button>
      )}
    </Upload>
  );
};

const validatorFileSize = (maxFileSize, value, callback) => {
  if (value && value.some(item => item.size > maxFileSize * 1024)) {
    callback(new Error(`Please upload the file size in ${maxFileSize}K within the picture`));
    return;
  }
};

const validatorFileTypes = (fileTypes, value, callback) => {
  if (value && $$.isArray(fileTypes) && fileTypes.length > 0) {
    if (
      value.some(
        item =>
          item.name &&
          !fileTypes.some(
            type => item.name.toLowerCase().indexOf(type.toLowerCase()) !== -1
          )
      )
    ) {
      callback(new Error(`Please upload ${fileTypes.join('、')}, type file`));
      return;
    }
  }
};

// If max is set, the control button is disabled
const isDisabled = (max, value) => {
  if (!max) return false;
  if (!value) return false;
  if (value && value.length < max) {
    return false;
  }
  return true;
};

const normFile = e => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};
