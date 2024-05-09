import React, { Component } from 'react';
import PropTypes from 'prop-types';
import E from 'wangeditor';
import defaultConfig from './config';
import $$ from 'cmn-utils';
import './style/index.less';
const { debounce } = $$;

class Editor extends Component {
  static propTypes = {
    value: PropTypes.string,
    onLoaded: PropTypes.func,
  }

  constructor(props) {
    super();
    this.state = {
      value: props.value
    };
    // Set this value to control the synchronization speed, too fast will affect the input experience, too slow may get the old value
// If the experience is too bad, we recommend that you do not return the value and use onLoaded to obtain the wangeditor instance
    this._onChange = debounce(this.onChange, 2000);
  }

  componentDidMount() {
    const { value, onLoaded, ...otherProps } = this.props;
    this.editor = new E(this.editorDom);
    this.editor.customConfig = {
      ...defaultConfig,
      onchange: this._onChange,
      ...otherProps
    };

    if (onLoaded && $$.isFunction(otherProps.onChange)) {
      this.editor.customConfig.onchange = otherProps.onChange;
    }
    
    this.editor.create();
    this.editor.txt.html(value);

    // return wangeditor
    if (onLoaded) onLoaded(this.editor);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        value: this.props.value
      });

      this.editor.txt.html(this.props.value || '');

      this._onChange(this.props.value);
    }
  }

  onChange = html => {
    const { onChange } = this.props;
    if (onChange) onChange(html);
  };

  render() {
    return (
      <div
        className="antui-editor"
        ref={node => {
          this.editorDom = node;
        }}
      />
    );
  }
}

export default Editor;
