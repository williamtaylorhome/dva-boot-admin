import React from 'react';
import { connect } from 'dva';
import { Layout, Button } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
import { normal, antdNotice } from 'components/Notification';
const { Content } = Layout;

@connect()
export default class extends BaseComponent {
  render() {
    return (
      <Layout className="full-layout page base-component-page">
        <Content>
          <Panel title="Notification / 通知">
            <p>We include two notification styles by default, when your component inherits from BaseCompoent, you can use the default notification style configured in the config.js this.notice, or you can implement your own notification class by implementing the Notification API</p></Panel>
          <Panel title="Normal notice">
            <Button.Group>
              <Button onClick={_ => normal.success('I‘m Hero')}>success</Button> 
              <Button onClick={_ => normal.error('I‘m Hero')}>fail</Button> 
              <Button onClick={_ => normal.warning('I‘m Hero')}>caution</Button> 
              <Button onClick={_ => normal.info('I‘m Hero')}>notice</Button> 
            </Button.Group>
          </Panel>
          <Panel title="Antd notice">
            <Button.Group>
              <Button onClick={_ => antdNotice.success('I‘m Hero')}>success</Button> 
              <Button onClick={_ => antdNotice.error('I‘m Hero')}>fail</Button> 
              <Button onClick={_ => antdNotice.warning('I‘m Hero')}>caution</Button> 
              <Button onClick={_ => antdNotice.info('I‘m Hero')}>notice</Button> 
            </Button.Group>
          </Panel>
        </Content>
      </Layout>
    );
  }
}
