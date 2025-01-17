import React from 'react';
import { connect } from 'dva';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Layout, Button } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Toolbar from 'components/Toolbar';
import SearchBar from 'components/SearchBar';
import DataTable from 'components/DataTable';
import { ModalForm } from 'components/Modal';
import createColumns from './columns';
import './index.less';
const { Content, Header, Footer } = Layout;
const Pagination = DataTable.Pagination;

@connect(({ crud, loading }) => ({
  crud,
  loading: loading.models.crud
}))
export default class extends BaseComponent {
  state = {
    record: null,
    visible: false,
    rows: []
  };

  handleDelete = records => {
    const { rows } = this.state;

    this.props.dispatch({
      type: 'crud/remove',
      payload: {
        records,
        success: () => {
          // If the operation is successful, exclude the deleted rows from the selected rows
          this.setState({
            rows: rows.filter(
              item => !records.some(jtem => jtem.id === item.id)
            )
          });
        }
      }
    });
  };

  render() {
    const { crud, loading, dispatch } = this.props;
    const { pageData, employees } = crud;
    const columns = createColumns(this, employees);
    const { rows, record, visible } = this.state;

    const searchBarProps = {
      columns,
      onSearch: values => {
        dispatch({
          type: 'crud/getPageInfo',
          payload: {
            pageData: pageData.filter(values).jumpPage(1, 10)
          }
        });
      }
    };

    const dataTableProps = {
      loading,
      columns,
      rowKey: 'id',
      dataItems: pageData,
      selectType: 'checkbox',
      showNum: true,
      isScroll: true,
      selectedRowKeys: rows.map(item => item.id),
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'crud/getPageInfo',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize)
          }
        });
      },
      onSelect: (keys, rows) => this.setState({ rows })
    };

    const modalFormProps = {
      loading,
      record,
      visible,
      columns,
      modalOpts: {
        width: 700
      },
      onCancel: () => {
        this.setState({
          record: null,
          visible: false
        });
      },
      // Additions and modifications will be added to this method.
// You can use the primary key or the presence or absence of a record to distinguish the state
      onSubmit: values => {
        dispatch({
          type: 'crud/save',
          payload: {
            values,
            success: () => {
              this.setState({
                record: null,
                visible: false
              });
            }
          }
        });
      }
    };

    return (
      <Layout className="full-layout crud-page">
        <Header>
          <Toolbar
            appendLeft={
              <Button.Group>
                <Button type="primary" icon={<PlusOutlined />} onClick={this.onAdd}>
                  New
                </Button>
                <Button
                  disabled={!rows.length}
                  onClick={e => this.onDelete(rows)}
                  icon={<DeleteOutlined />}
                >
                  Delete
                </Button>
              </Button.Group>
            }
            pullDown={<SearchBar type="grid" {...searchBarProps} />}
          >
            <SearchBar group="abc" {...searchBarProps} />
          </Toolbar>
        </Header>
        <Content>
          <DataTable {...dataTableProps} />
        </Content>
        <Footer>
          <Pagination {...dataTableProps} />
        </Footer>
        <ModalForm {...modalFormProps} />
      </Layout>
    );
  }
}
