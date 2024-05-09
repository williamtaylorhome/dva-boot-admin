import React from 'react';
import { connect } from 'dva';
import { Layout, Button, message } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Editor from 'components/Editor';
import Panel from 'components/Panel';
const { Content } = Layout;

@connect()
export default class extends BaseComponent {
  state = {
    html: '',
    htmlEditor: ''
  };
  onChange = html => {
    this.setState({
      html
    });
  };

  // It will return an instance of wangEditor, with its onChange function, note that this is his onChange
  onLoaded = editor => {
    this.editor = editor;
  };

  onChangeNative = html => {
    this.setState({
      htmlEditor: html
    });
  };

  render() {
    return (
      <Layout className="full-layout page">
        <Content>
          <Panel title="Rich text">
            <p>
              Rich text usage
              <a href="https://github.com/wangfupeng1988/wangEditor">
                wangEditor
              </a>
              , the specific parameters can be viewed on its website.
            </p>
          </Panel>

          <Panel title="wangEditor 方式">
            <p>
              It is recommended to use this method to get the native object manipulation editor in onLoaded
            </p>
            <p>
              <Button.Group>
                <Button
                  type="primary"
                  onClick={e => this.editor.txt.html('<p>Be happy today, too!</p>')}
                >
                  Set the value
                </Button>
                <Button onClick={e => message.success(this.editor.txt.html())}>
                  Get the value
                </Button>
                <Button onClick={e => this.editor.txt.html('')}>Clear the value</Button>
              </Button.Group>
            </p>
            <Editor onLoaded={this.onLoaded} onChange={this.onChangeNative} />
            <b>HTML: </b>
            {this.state.htmlEditor}
          </Panel>

          <Panel title="Full control">
            <p>
              Full control, easy to use, no native API calls involved, but the user experience is not as good as the one above
            </p>
            <p>
              <Button.Group>
                <Button
                  type="primary"
                  onClick={e =>
                    this.setState({ html: '<div>Be happy today, too!</div>' })
                  }
                >
                  Set the value
                </Button>
                <Button onClick={e => message.success(this.state.html)}>
                  Get the value
                </Button>
                <Button onClick={e => this.setState({ html: '' })}>
                  Clear the value
                </Button>
              </Button.Group>
            </p>
            <Editor onChange={this.onChange} value={this.state.html} />
            <b>HTML: </b>
            {this.state.html}
          </Panel>
        </Content>
      </Layout>
    );
  }
}
