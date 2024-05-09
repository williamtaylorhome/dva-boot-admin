import React from 'react';
import { connect } from 'dva';
import { BulbOutlined } from '@ant-design/icons';
import { Layout, Button } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
const { Content } = Layout;

@connect()
export default class extends BaseComponent {
  render() {
    return (
      <Layout className="full-layout page column-page">
        <Content>
          <Panel title="illustrate">
            <h3>Column grammar</h3>
            <p>
              By configuring the column, we can generate three major elements in our page at the same time, a search bar (advanced search) component, a newly modified form component, and a data table component with pagination.<a
                style={{ textDecoration: 'underline' }}
                href="https://github.com/LANIF-UI/dva-boot-admin/blob/master/docs/columns.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                [Configuration description]
              </a>
            </p>
            <Button
              icon={<BulbOutlined />}
              type="primary"
              onClick={_ => this.history.push('/crud')}
            >
              CRUD page
            </Button>
          </Panel>
        </Content>
      </Layout>
    );
  }
}
