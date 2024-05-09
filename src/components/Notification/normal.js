import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import $$ from 'cmn-utils';
import Notification from './Notification';
import './normal.less';
const SHOW_NOTICE = 'SHOW_NOTICE';
const HIDE_NOTICE = 'HIDE_NOTICE';

export function notice(config, type = 'default') {
  $$.trigger(SHOW_NOTICE, { type, config });
  return hide;
}

export function hide() {
  $$.trigger(HIDE_NOTICE);
}

/**
 * An example of a notification bar
 * It can be convenient to use the custom Event provided by cmn-utils
 * In the global scope, turn on and off the notification bar
 */
class Normal extends PureComponent {
  constructor() {
    super();
    $$.on(SHOW_NOTICE, this.showNotice);
    $$.on(HIDE_NOTICE, this.hideNotice);

    this.state = {
      active: false,
      type: 'default',
      title: '',
      message: ''
    };
  }

  componentWillUnmount() {
    $$.off(SHOW_NOTICE, this.showNotice); // Clean up the snooping
    $$.off(HIDE_NOTICE, this.hideNotice);
  }

  showNotice = ({ config, type }) => {
    this.setState({
      active: true,
      message: config.message,
      title: config.title || '提示：',
      type
    });
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.timer = setTimeout(this.hideNotice, 3000);
  };

  hideNotice = () => {
    this.setState({
      active: false
    });
  };

  render() {
    const { message, title, active, type } = this.state;
    return (
      <div className={`la-notification${active ? ' active' : ''}`}>
        <div className={`content ${type}`}>
          {title} {message}
        </div>
        <span className="close" onClick={this.hideNotice} />
      </div>
    );
  }
}

export default class extends Notification {
  static success(config) {
    if ($$.isObject(config)) {
      notice(config, 'success');
    } else {
      notice(
        {
          title: 'Success:',
          message: config
        },
        'success'
      );
    }
  }

  static error(config) {
    if ($$.isObject(config)) {
      notice(config, 'error');
    } else {
      notice(
        {
          title: 'Something went wrong:',
          message: config
        },
        'error'
      );
    }
  }

  static info(config) {
    if ($$.isObject(config)) {
      notice(config);
    } else {
      notice({
        message: config
      });
    }
  }

  static warning(config) {
    if ($$.isObject(config)) {
      notice(config, 'warn');
    } else {
      notice(
        {
          title: 'Caution:',
          message: config
        },
        'warn'
      );
    }
  }

  static warn(config) {
    if ($$.isObject(config)) {
      notice(config, 'warn');
    } else {
      notice(
        {
          title: 'Caution:',
          message: config
        },
        'warn'
      );
    }
  }

  static close(key) {
    /* Shut down*/
  }

  static destroy() {
    /* Destroyed*/
  }
}

const container = document.createElement('div');
document.body.appendChild(container);
ReactDOM.render(<Normal />, container);
