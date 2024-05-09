import React from 'react';
import { connect, router } from 'dva';
import { Layout } from 'antd';
import BaseComponent from 'components/BaseComponent';
import './index.less';
const { Link, Switch } = router;
const { Content, Header } = Layout;

@connect()
export default class extends BaseComponent {
  render() {
    const { routerData } = this.props;
    const { childRoutes } = routerData;
    return (
      <Layout className="full-layout page level-route-page">
        <Header>
          <Link className="sub-route-link" to="/level-route">
            Level 1 Jump
          </Link>
          <Link className="sub-route-link" to="/level-route/sub-route">
            Level 2 Jump
          </Link>
        </Header>
        <Content>
          <Switch>{childRoutes}</Switch>
        </Content>
      </Layout>
    );
  }
}
