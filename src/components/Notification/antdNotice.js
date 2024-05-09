import { notification } from 'antd';
import $$ from 'cmn-utils';
import Notification from './Notification';
import './antdNotice.less';

const prefixCls = 'antui-notification';
const defaultConfig = {
};

function notice(config, type, title) {
  if ($$.isObject(config)) {
    notification[type]({
      className: `${prefixCls} ${prefixCls}-${type}`,
      ...defaultConfig,
      ...config
    });
  } else {
    notification[type]({
      className: `${prefixCls} ${prefixCls}-${type}`,
      message: title,
      description: config,
      ...defaultConfig
    });
  }
}

export default class extends Notification {
  static success(config) {
    notice(config, 'success', 'success');
  }

  static error(config) {
    notice(config, 'error', 'Something went wrong');
  }

  static info(config) {
    notice(config, 'info', 'prompt');
  }

  static warning(config) {
    notice(config, 'warning', 'caution');
  }

  static warn(config) {
    notice(config, 'warning', 'caution');
  }

  static close(key) {
    notification.close(key);
  }

  static destroy() {
    notification.destroy();
  }
}
