import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import BaseComponent from 'components/BaseComponent';
import './index.less';
const { Content } = Layout;

@connect()
export default class extends BaseComponent {
  render() {
    return (
      <Layout className="full-layout page level2-route-page">
        <Content>
          <h2>Secondary routing</h2> 
        </Content>
      </Layout>
    );
  }
}
