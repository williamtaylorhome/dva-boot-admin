import React from 'react';
import { connect } from 'dva';
import { Layout, Button } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
const { Content } = Layout;

@connect()
export default class extends BaseComponent {
  render() {
    return (
      <Layout className="full-layout page base-component-page">
        <Content>
          <Panel title="illustrate">
            <h2>BaseComponent</h2>
            <p>All routing pages can use the base class, you can extract public methods and put them into this class, such as basic CRUD methods, route jumps, basic pop-ups, etc</p>
            <h3>Notice</h3>
            <Button.Group>
              <Button onClick={_ => this.notice.success('I‘m Hero')}>success</Button> 
              <Button onClick={_ => this.notice.error('I‘m Hero')}>error</Button> 
              <Button onClick={_ => this.notice.warning('I‘m Hero')}>warning</Button> 
              <Button onClick={_ => this.notice.info('I‘m Hero')}>notice</Button> 
            </Button.Group>
            <h3>Router</h3>
            <Button onClick={_ => this.history.push('/')}>Back to the home page</Button>
          </Panel>
        </Content>
      </Layout>
    );
  }
}
