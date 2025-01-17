import React from 'react';
import { connect, router } from 'dva';
import { Layout, Row, Col } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
import SearchBar from 'components/SearchBar';
import {
  columns1,
  columns2,
  columns3,
  columns4,
  columns5,
  columns6
} from './columns';
const { Link } = router;
const { Content } = Layout;

@connect()
export default class extends BaseComponent {
  onSearch(values, isReset) {
    console.log(values, isReset);
  }

  render() {
    return (
      <Layout className="full-layout page">
        <Content>
          <Panel title="illustrate">
            <h3>SearchBar usage</h3>
            <p>
              SearchBar Usually combined<Link to="/column">Columns</Link>to use Columns, which defines its data structure and supports multiple types of data</p>
          </Panel>
          <Panel title="Inline search">
            <SearchBar columns={columns1} onSearch={this.onSearch} />
          </Panel>
          <Panel title="Initial value">
            <SearchBar columns={columns1} record={{roleType: '2', roleName: 'visitor', order: 2}} onSearch={this.onSearch} />
          </Panel>
          <Panel title="Date & Time">
            <SearchBar columns={columns3} onSearch={this.onSearch} />
          </Panel>
          <Panel title="Cascading, drop-down tree">
            <SearchBar columns={columns5} onSearch={this.onSearch} />
          </Panel>
          <Panel title="Grid style&A drop-down box is attached to the form">
            <Row gutter={20}>
              <Col span={12}>
                <SearchBar
                  appendTo
                  columns={columns2}
                  type="grid"
                  onSearch={this.onSearch}
                  cols={{span: 8}}
                />
              </Col>
              <Col span={12}>
                <SearchBar
                  columns={columns3}
                  type="grid"
                  onSearch={this.onSearch}
                  cols={{span: 24}}
                />
              </Col>
            </Row>
          </Panel>
          <Panel title="Multiple conditions">
            <SearchBar
              columns={columns4}
              type="grid"
              onSearch={this.onSearch}
            />
          </Panel>
          <Panel title="Custom type">
            <SearchBar
              columns={columns6}
              type="grid"
              onSearch={this.onSearch}
            />
          </Panel>
        </Content>
      </Layout>
    );
  }
}
