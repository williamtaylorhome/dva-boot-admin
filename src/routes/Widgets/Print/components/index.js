import React from 'react';
import { connect } from 'dva';
import { PrinterOutlined } from '@ant-design/icons';
import { Layout, Row, Col, Button } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
import Print from 'components/Print';
import EC from 'components/Charts/ECharts/EC';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import Report from './Report';
import Dynamic from './Dynamic';
const { Content } = Layout;

@connect()
export default class Blank extends BaseComponent {
  state = {
    element1: null,
    element2: null
  };

  saveElement1 = node => {
    this.setState({
      element1: node
    });
  };

  saveElement2 = node => {
    this.setState({
      element2: node
    });
  };

  getOption = () => ({
    title: {
      text: 'The source from which a site user accessed',
      subtext: 'Pure fiction',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['Direct access', 'Email marketing', 'Affiliate Advertising', 'Video ads', 'search engine']
    },
    series: [
      {
        name: 'Access source',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          { value: 335, name: 'Direct access' },
          { value: 310, name: 'Email marketing' },
          { value: 234, name: 'Affiliate Advertising' },
          { value: 135, name: 'Video ads' },
          { value: 1548, name: 'search engine' }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });

  render() {
    const { element1, element2 } = this.state;
    const comps = (
      <div>
        <table border="1" style={{width: '100%'}}>
          <thead>
            <tr>
              <th style={{textAlign: 'center', color: 'aqua'}}>name</th>
              <th style={{textAlign: 'center', color: 'aqua'}}>grade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{textAlign: 'center'}}>Tom</td>
              <td style={{textAlign: 'center'}}>1st grade</td>
            </tr>
            <tr>
              <td style={{textAlign: 'center'}}>Harry</td>
              <td style={{textAlign: 'center'}}>Second grade</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
    return (
      <Layout className="full-layout page print-page">
        <Content>
          <Panel title="illustrate" ref={this.saveElement1}>
            <h3>Print usage</h3>
            <p>Supports printing components, printing HTML text, dom elements, unrendered React components, etc</p>
          </Panel>
          <Row gutter={20}>
            <Col span={12}>
              <Panel title="string & HTML text">
                <div>{`<span style="color: red">Fight the tiger tonight</span>`}</div>
                <br />
                <Print content={`<span style="color: red">Fight the tiger tonight</span>`} />
              </Panel>
              <Panel title="Unrendered React components">
                <div>{comps}</div>
                <br />
                <Print
                  trigger={<Button icon={<PrinterOutlined />}>print</Button>}
                  content={comps}
                />
              </Panel>
              <Panel title="Example of a report">
                <div>Click the button to print a copy of the report</div>
                <br />
                <Print
                  trigger={<Button icon={<PrinterOutlined />}>print</Button>}
                  content={<Report />}
                />
              </Panel>
              <Panel title="Get content dynamically">
                <div>print EMOJI</div>
                <br />
                <Print
                  trigger={<Button icon={<PrinterOutlined />}>print</Button>}
                  content={<Dynamic />}
                />
              </Panel>
            </Col>
            <Col span={12}>
              <Panel title="ref corresponding DOM element | React node">
                <div>The top instructions will be printed</div>
                <br />
                {element1 ? (
                  <Print
                    trigger={<Button icon={<PrinterOutlined />}>print</Button>}
                    content={element1}
                  />
                ) : null}
              </Panel>
              <Panel title="Canvas charts">
                <div style={{ height: 300 }}>
                  <EC option={this.getOption()} ref={this.saveElement2} />
                </div>
                <br />
                {element2 ? (
                  <Print
                    canvas
                    trigger={<Button icon={<PrinterOutlined />}>print</Button>}
                    content={element2}
                  />
                ) : null}
              </Panel>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}
