import React from 'react';
import { connect, router } from 'dva';
import { Layout, Row, Col, Tree } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
import SideLayout from 'components/SideLayout';
import DataTable, { Editable } from 'components/DataTable';
import {
  columns1,
  columns2,
  columns3,
  columns4,
  columns5,
  columns6
} from './columns';
import './index.less';
const { Link } = router;
const { Content } = Layout;
const Pagination = DataTable.Pagination;
const TreeNode = Tree.TreeNode;

@connect(({ datatable, loading }) => ({
  datatable,
  loading: loading.models.datatable
}))
export default class extends BaseComponent {
  state = {
    editingKey: null
  };

  componentDidMount() {
    const { dispatch, datatable } = this.props;
    const { pageData, pageDataSort } = datatable;

    dispatch({
      type: 'datatable/@request',
      payload: {
        valueField: 'pageData',
        url: '/datatable/getList',
        pageInfo: pageData.startPage(1, 10)
      }
    });

    dispatch({
      type: 'datatable/@request',
      afterResponse: resp => resp.data,
      payload: {
        valueField: 'deptTreeData',
        url: '/tree/getDept'
      }
    });

    dispatch({
      type: 'datatable/@request',
      afterResponse: resp => resp.data,
      payload: {
        valueField: 'dataList',
        url: '/datatable/frontPaging'
      }
    });

    dispatch({
      type: 'datatable/@request',
      payload: {
        valueField: 'pageDataSort',
        url: '/datatable/getList',
        pageInfo: pageDataSort.startPage(1, 10)
      }
    });
  }

  renderTreeNodes = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  };

  onSelectTreeNode = (selectedKeys, info) => {
    console.log('onSelect', selectedKeys);

    // Impersonation requests
    const { dispatch, datatable } = this.props;
    const { pageData } = datatable;
    dispatch({
      type: 'datatable/@request',
      payload: {
        valueField: 'pageData',
        url: '/datatable/getList',
        pageInfo: pageData.startPage(1, 10)
      }
    });
  };

  onEdit = record => {
    this.setState({
      editingKey: record.id
    });
  };

  onCancelEdit = () => {
    this.setState({ editingKey: null });
  };

  onSave = (record, form) => {
    form.validateFields((err, values) => {
      if (!err) {
        console.log('save:', values, record);
        // Demo simulation changes the data
        const { dataList } = this.props.datatable;
        dataList.list = dataList.list.map(item => {
          if (item.id === record.id) {
            return { ...item, ...values };
          } else {
            return item;
          }
        });
        this.props.dispatch({
          type: 'datatable/@change',
          payload: {
            dataList
          }
        });
        this.onCancelEdit();
      } else {
        console.log(err);
      }
    });
  };

  render() {
    const { datatable, loading } = this.props;
    const { pageData, deptTreeData, dataList, pageDataSort } = datatable;
    const dataTableProps1 = {
      loading,
      columns: columns1,
      rowKey: 'id',
      dataItems: pageData,
      onChange: ({ pageNum, pageSize }) => {}
    };

    const dataTableProps2 = {
      loading,
      columns: columns1,
      rowKey: 'id',
      dataItems: pageData,
      selectType: 'checkbox',
      showNum: true,
      isScroll: true
    };

    const dataTableProps3 = {
      loading,
      columns: columns2,
      rowKey: 'id',
      dataItems: pageData,
      isScroll: true
    };

    const dataTableProps4 = {
      loading,
      columns: columns3,
      rowKey: 'id',
      selectType: 'radio',
      dataItems: pageData,
      showNum: true
    };

    const dataTableProps5 = {
      loading,
      columns: columns1,
      rowKey: 'id',
      dataItems: dataList,
      showNum: true
    };

    const dataTableProps6 = {
      loading,
      columns: columns4,
      rowKey: 'id',
      dataItems: pageDataSort,
      onChange: ({ pageNum, pageSize, sorter }) => {
        this.props.dispatch({
          type: 'datatable/@request',
          payload: {
            valueField: 'pageDataSort',
            url: '/datatable/getList',
            pageInfo: pageDataSort.sortBy(sorter).jumpPage(pageNum, pageSize)
          }
        });
      },
      isScroll: true
    };

    const dataTableProps7 = {
      loading,
      columns: columns5(this, this.state.editingKey),
      rowKey: 'id',
      dataItems: pageData,
      showNum: true
    };

    const lessData = {
      list: dataList.list.filter((item, index) => index < 6) // Article 6
    };
    const dataTableProps8 = {
      loading,
      columns: columns6,
      isScroll: { x: 666 }, // It needs to be set to a width
      rowKey: 'id',
      dataItems: lessData,
      showNum: true
    };

    return (
      <Layout className="full-layout page datatable-page">
        <Content>
          <Panel title="illustrate">
            <h3>DataTable usage</h3>
            <p>
              DataTable Usually combined<Link to="/column">Columns</Link>
              To use, Columns defines its data structure, supports multiple types of data, extends from antd's Table component, and can use the Table API.
            </p>
          </Panel>
          <Row gutter={20}>
            <Col span={12}>
              <Panel title="Basic Usage">
                <DataTable {...dataTableProps1} />
              </Panel>
            </Col>
            <Col span={12}>
              <Panel title="The interior is split into pages">
                <DataTable pagination {...dataTableProps1} />
              </Panel>
            </Col>
          </Row>
          <Panel title="Outside the page">
            <DataTable {...dataTableProps1} />
            <div className="footer">
              <Pagination {...dataTableProps1} />
            </div>
          </Panel>
          <Row gutter={20}>
            <Col span={12}>
              <Panel title="Line number, initial value">
                <DataTable {...dataTableProps2} selectedRowKeys={[1, 2, 4]} />
              </Panel>
            </Col>
            <Col span={12}>
              <Panel title="Column tips > widths">
                <DataTable {...dataTableProps3} />
              </Panel>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={6}>
              <Panel title="Data Dictionary > Single Selection">
                <DataTable {...dataTableProps4} />
              </Panel>
            </Col>
            <Col span={18}>
              <Panel title="The left tree is linked">
                <SideLayout
                  title="Organizational structure"
                  sideContent={
                    <Tree onSelect={this.onSelectTreeNode}>
                      {this.renderTreeNodes(deptTreeData)}
                    </Tree>
                  }
                >
                  <DataTable {...dataTableProps1} />
                </SideLayout>
              </Panel>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={10}>
              <Panel title="Front desk pagination" height={500} scroll>
                <DataTable pagination={{ pageSize: 20 }} {...dataTableProps5} />
              </Panel>
            </Col>
            <Col span={14}>
              <Panel title="sort" height={500} scroll>
                <DataTable {...dataTableProps6} />
                <div className="footer">
                  <Pagination {...dataTableProps6} />
                </div>
              </Panel>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Panel title="Editable lines that are used similarly to Forms" height={500} scroll>
                <Editable pagination={{ pageSize: 20 }} {...dataTableProps7} />
              </Panel>
            </Col>
            <Col span={12}>
              <Panel title="Fixed Columns" height={500} scroll>
                <p>0.antd 3.24.0 or earlier, there is a problem with fixed support and needs to be upgraded</p>
                <p>
                  1.You need to set it up for the table isScroll Equivalent scroll of antd, For example: {'isScroll: { x: 666 }'},cannot
                  isScroll: true,Otherwise, there will be a blank space for the right fixation
                </p>
                <p>2.columns, it is better to set the width of the fixed column as well</p>
                <DataTable {...dataTableProps8} />
              </Panel>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}
