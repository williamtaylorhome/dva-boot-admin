import React from 'react';
import { connect } from 'dva';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Layout, Button } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
import Toolbar from 'components/Toolbar';
import SearchBar from 'components/SearchBar';
import createColumns from './columns';
import './index.less';
const { Content } = Layout;

/**
 * toolbar
 */
@connect()
export default class extends BaseComponent {
  render() {
    const columns = createColumns(this);

    const searchBarProps = {
      columns,
      onSearch: (values) => {
        console.log(values)
      }
    };

    return (
      <Layout className="full-layout page toolbar-page">
        <Content>
          <Panel title="Basic Usage">
            <Toolbar 
              className="toolbar-demo"
              appendLeft={
                <Button.Group>
                  <Button type="primary"><PlusOutlined />New</Button>
                  <Button><DeleteOutlined />Delete</Button>
                </Button.Group>
              }
            />
          </Panel>
          <Panel title="combination SearchBar">
            <Toolbar 
              className="toolbar-demo"
              appendLeft={
                <Button.Group>
                  <Button type="primary"><PlusOutlined />New</Button>
                  <Button><DeleteOutlined />Delete</Button>
                </Button.Group>
              }
            >
              <SearchBar {...searchBarProps} />
            </Toolbar>
          </Panel>
          <Panel title="combination SearchBar，and scroll down to show more">
            <Toolbar 
              className="toolbar-demo"
              appendLeft={
                <Button.Group>
                  <Button type="primary"><PlusOutlined />New</Button>
                  <Button><DeleteOutlined />Delete</Button>
                </Button.Group>
              }
              pullDown={
                <SearchBar type="grid" {...searchBarProps} />
              }
            >
              <SearchBar {...searchBarProps} group='1' />
            </Toolbar>
          </Panel>
        </Content>
      </Layout>
    );
  }
}
