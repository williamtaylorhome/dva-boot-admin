import React from 'react';
import { connect, router } from 'dva';
import { Layout, Row, Col, Button } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
import Form from 'components/Form';
import PageHelper from '@/utils/pageHelper';
import $$ from 'cmn-utils';
import {
  columns1,
  columns2,
  columns3,
  columns4,
  columns5,
  columns6,
  columns7,
  columns8,
  columns9,
  createColumns10,
  createColumns11,
  columns12,
  columns13Fun,
} from './columns';
const { Link } = router;
const { Content } = Layout;

@connect(({ form }) => ({
  form,
}))
export default class extends BaseComponent {
  state = {
    columns13: columns13Fun(),
  };

  onSubmit(values) {
    console.log(values);
  }

  onLoadData = (treeNode) => {
    const treeData = [...this.props.form.treeData];
    return new Promise((resolve) => {
      this.props.dispatch({
        type: 'form/@request',
        payload: {
          valueField: 'treeData',
          url: '/tree/getAsyncTreeSelect',
          data: treeNode.props.eventKey,
        },
        afterResponse: (resp) => {
          const loop = (data) => {
            data.forEach((item) => {
              if (item.children) {
                loop(item.children);
              } else if (treeNode.props.eventKey === item.key) {
                item.children = resp.data;
              }
            });
          };
          loop(treeData);
          resolve();
          return treeData;
        },
      });
    });
  };

  onLoadTableData = (pageInfo) => {
    return $$.post('/datatable/getList', PageHelper.requestFormat(pageInfo))
      .then((resp) => {
        return PageHelper.responseFormat(resp);
      })
      .catch((e) => console.error(e));
  };

  onLoadAutoCompleteData = (value) => {
    return new Promise((resolve, reject) => {
      $$.post('/form/autoComplete', value)
        .then((resp) => {
          const { data } = resp;
          resolve(data.list);
        })
        .catch((e) => reject(e)); // reject stop loading
    });
  };

  render() {
    const { treeData } = this.props.form;

    const record1 = {
      id: 123,
      roleType: '2', // The type can't be wrong, it can't be the number 2
      roleName: 'administrator',
    };
    const columns10 = createColumns10(this, treeData);
    const columns11 = createColumns11(this);
    return (
      <Layout className="full-layout page">
        <Content>
          <Panel title="illustrate">
            <h3>Form usage</h3>
            <p>
              Form is usually combined
              <Link to="/column">Columns</Link>
              to define its data structure by Columns, which supports multiple types of data (
              <code>
                cascade，date，editor，text，textarea，password，select，transfer，transferTree，treeSelect，table，
                custom，checkbox，radio，autoComplete，upload，line
              </code>
              )， The form component that extends from antd can use its api.
            </p>
          </Panel>
          <Row gutter={20}>
            <Col span={12}>
              <Panel title="Simple usage">
                <Form columns={columns1} onSubmit={this.onSubmit} />
              </Panel>
            </Col>
            <Col span={12}>
              <Panel title="assignment">
                <Form
                  columns={columns1}
                  record={record1}
                  onSubmit={this.onSubmit}
                />
              </Panel>
            </Col>
          </Row>
          <Panel title="Inline style">
            <Form type="inline" columns={columns1} onSubmit={this.onSubmit} />
          </Panel>
          <Row gutter={20}>
            <Col span={12}>
              <Panel title="Initial value">
                <Form columns={columns2} onSubmit={this.onSubmit} />
              </Panel>
              <Panel title="Dynamically add or remove form items">
                <Form
                  ref={(node) => (this.customBtnForm = node)}
                  columns={this.state.columns13}
                  onSubmit={this.onSubmit}
                >
                  <div style={{ marginBottom: 10, width: '100%' }}>
                    <Button
                      type="dashed"
                      block
                      onClick={() => {
                        const c = columns13Fun([
                          {
                            title: 'address',
                            name: 'address',
                            formItem: {},
                          },
                        ])
                        this.setState({
                          columns13: c,
                        });
                      }}
                    >
                      Add one item
                    </Button>
                  </div>
                </Form>
              </Panel>
            </Col>
            <Col span={12}>
              <Panel title="Form validation">
                <Form columns={columns3} onSubmit={this.onSubmit} />
              </Panel>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Panel title="User login">
                <Form columns={columns4} onSubmit={this.onSubmit} />
              </Panel>
            </Col>
            <Col span={12}>
              <Panel title="User Registration">
                <Form columns={columns5} onSubmit={this.onSubmit} />
              </Panel>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Panel title="Date & Time">
                <Form columns={columns6} onSubmit={this.onSubmit} />
              </Panel>
            </Col>
            <Col span={12}>
              <Panel title="Multiple columns (use col 和 formItemLayout)">
                <Form columns={columns7} onSubmit={this.onSubmit} />
              </Panel>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Panel title="Customize the submit button">
                <Form
                  ref={(node) => (this.customBtnForm = node)}
                  columns={columns5}
                  footer={
                    <Button
                      style={{ display: 'block', margin: '0 auto' }}
                      size="large"
                      onClick={(e) => {
                        const form = this.customBtnForm;
                        form.validateFields((err, values) => {
                          if (!err) {
                            console.log('Custom submissions:', values);
                          }
                        });
                      }}
                    >
                      enroll
                    </Button>
                  }
                />
              </Panel>
            </Col>
            <Col span={12}>
              <Panel title="Shuttle box">
                <Form columns={columns8} onSubmit={this.onSubmit} />
              </Panel>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Panel title="Cascade > Dropdown Tree & Autocomplete">
                <Form columns={columns10} onSubmit={this.onSubmit} />
              </Panel>
            </Col>

            <Col span={12}>
              <Panel title="The drop-down box is bound to the container and is not serial when scrolling">
                <Form appendTo columns={columns1} onSubmit={this.onSubmit} />
              </Panel>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Panel title="Custom type">
                <Form columns={columns9} onSubmit={this.onSubmit} />
              </Panel>
              <Panel title="Single & Double">
                <Form columns={columns12} onSubmit={this.onSubmit} />
              </Panel>
            </Col>
            <Col span={12}>
              <Panel title="Table type, which is used to select large data volumes">
                <Form columns={columns11} onSubmit={this.onSubmit} />
              </Panel>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}
