import React from 'react';
import { Upload } from 'antd';
import $$ from 'cmn-utils';
import config from '@/config';
// Get the parameters from the global configuration
const request = config.request || {};

/**
 * Enables the upload to go through the global proxy and carry the global header information
 */
export default class extends React.PureComponent {
  render() {
    const { headers, action, ...otherProps } = this.props;

    let newheaders = { ...headers };

    const uploadProps = { ...otherProps };

    if (request && request.withHeaders) {
      if ($$.isFunction(request.withHeaders)) {
        newheaders = { ...request.withHeaders(), ...newheaders };
      } else if ($$.isObject(request.withHeaders)) {
        newheaders = { ...request.withHeaders, ...newheaders };
      }
      uploadProps.headers = newheaders;
    }

    let nextURL = (request.prefix || '') + action;
    if (/^(http|https|ftp):\/\//.test(action)) {
      nextURL = action;
    }

    if (action) {
      uploadProps.action = nextURL;
    }

    return <Upload {...uploadProps} />;
  }
}
