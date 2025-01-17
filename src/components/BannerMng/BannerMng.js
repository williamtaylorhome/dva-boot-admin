import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  CaretDownOutlined,
  CaretUpOutlined,
  CloseOutlined,
  EditOutlined,
  PlusOutlined,
  RollbackOutlined,
} from '@ant-design/icons';

import { Button, message } from 'antd';
import Form from './Form';
import Icon from 'components/Icon';
import LazyLoad from 'components/LazyLoad';
import isEqual from 'react-fast-compare';
import notdata from 'assets/images/nodata.svg';
import './style/index.less';

// Preset columns
const columns = [
  {
    title: 'title',
    name: 'title',
    formItem: {
      rules: [
        {
          required: true,
          message: 'Please enter a title'
        },
        {
          max: 300,
          message: 'You can enter up to 300 characters for the title'
        },
        {
          pattern: /^[\w\u4E00-\u9FA5]+$/,
          message: 'Only English letters, numbers, and Chinese characters can be entered for the title'
        }
      ]
    }
  },
  {
    title: 'link',
    name: 'link',
    formItem: {
      rules: [
        {
          required: true,
          message: 'Please enter the link'
        },
        {
          max: 300,
          message: 'You can enter up to 300 characters for a link'
        }
      ]
    }
  },
  {
    title: 'Image',
    name: 'file',
    formItem: {
      type: 'upload',
      listType: 'picture-card',
      max: 1,
      fileTypes: ['.png', '.jpg', '.gif'],
      normalize: value => {
        return [
          {
            uid: -1,
            thumbUrl: value
          }
        ];
      },
      rules: [
        {
          required: true,
          message: 'Please upload an image'
        }
      ],
      renderUpload: (a, b, isDisabled) =>
        isDisabled ? null : (
          <div>
            <Icon type="plus" />
            <div className="ant-upload-text">upload</div>
          </div>
        )
    }
  }
];

class BannerMng extends Component {
  static propTypes = {
    dataSource: PropTypes.array,
    onChange: PropTypes.func,
    fileNum: PropTypes.number,
    fileSize: PropTypes.number,
    fileType: PropTypes.array,
    formCols: PropTypes.array,
    title: PropTypes.node,
    rowKey: PropTypes.string
  };

  static defaultProps = {
    formCols: columns,
    title: 'slide',
    rowKey: 'title'
  };

  constructor(props) {
    const { formCols } = props;
    super(props);

    let imageKey = null;
    formCols.forEach(item => {
      if (item.formItem && item.formItem.type === 'upload') {
        imageKey = item.name;
      }
    });
    if (!imageKey)
      console.error("BannerMng required a column of type 'upload'");

    this.state = {
      isEdit: false,
      isAdd: false,
      record: null,
      imageKey,
      dataSource: props.dataSource || []
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.dataSource && !isEqual(prevState.dataSource, nextProps.dataSource)) {
      return {
        dataSource: nextProps.dataSource
      }
    }
    return null;
  }

  onEditBanner = (item, editKey) => {
    this.setState({
      isEdit: editKey,
      isAdd: false,
      record: item
    });
  };

  onAddBanner = () => {
    if (this.props.fileNum && this.props.fileNum > 0) {
      if (this.props.dataSource.length >= this.props.fileNum) {
        message.error(`You can add up to that ${this.props.fileNum} pictures`);
        return;
      }
    }

    this.setState({
      isAdd: true,
      isEdit: false,
      record: null
    });
  };

  onCancel = () => {
    this.setState({
      isAdd: false,
      isEdit: false,
      record: null
    });
  };

  onChange = (type, item, i) => {
    let { dataSource, isEdit } = this.state;
    const newState = {};
    switch (type) {
      case 'up':
        dataSource.splice(i - 1, 0, dataSource.splice(i, 1)[0]);
        break;
      case 'down':
        dataSource.splice(i + 1, 0, dataSource.splice(i, 1)[0]);
        break;
      case 'add':
        newState.isAdd = false;
        dataSource.push(item);
        break;
      case 'edit':
        let tempIndex = -1;
        let temp = dataSource.filter((data, index) => {
          if ('edit_' + index === isEdit) {
            tempIndex = index;
            return false;
          }
          return true;
        });
        temp.splice(tempIndex, 0, item);
        dataSource = temp;
        newState.isEdit = false;
        break;
      case 'delete':
        dataSource.splice(i, 1);
        break;
      default:
        break;
    }
    this.setState({
      dataSource,
      ...newState
    });

    this.props.onChange && this.props.onChange(dataSource);
  };

  render() {
    const { formCols, title, rowKey } = this.props;
    let { dataSource, record, isEdit, isAdd, imageKey } = this.state;

    return (
      <div className="banner-view-mng">
        <div className="banner-title clearfix">
          <div className="title">
            <Icon type="picture" /> {isEdit ? 'revise' : isAdd ? 'New' : ''}
            {title}
          </div>
          <div className="btns">
            {!isAdd && !isEdit ? (
              <Button icon={<PlusOutlined />} type="primary" onClick={this.onAddBanner}>
                New
              </Button>
            ) : (
              <Button icon={<RollbackOutlined />} onClick={this.onCancel}>
                return
              </Button>
            )}
          </div>
        </div>
        {isEdit || isAdd ? (
          <Form
            imageKey={imageKey}
            columns={formCols}
            record={record}
            onCancel={this.onCancel}
            onSubmit={values => this.onChange(isEdit ? 'edit' : 'add', values)}
          />
        ) : (
          <div className="banner-content clearfix">
            {!dataSource.length ? (
              <div className="notdata">
                <img src={notdata} alt="" />
                <div>~~There is no content~~</div>
              </div>
            ) : null}
            {dataSource.map((item, i) => (
              <div className="row" key={item[rowKey]}>
                <div className="preview">
                  <LazyLoad dataSrc={item[imageKey]} />
                </div>
                <ul className="oper">
                  <li className="top">
                    <Button
                      icon={<CaretUpOutlined />}
                      title="Move up"
                      disabled={i === 0}
                      onClick={e => this.onChange('up', item, i)}
                    />
                  </li>
                  <li className="bottom">
                    <Button
                      icon={<CaretDownOutlined />}
                      title="Move down"
                      disabled={i === dataSource.length - 1}
                      onClick={e => this.onChange('down', item, i)}
                    />
                  </li>
                  <li className="edit">
                    <Button
                      icon={<EditOutlined />}
                      title="revise"
                      onClick={e => this.onEditBanner(item, 'edit_' + i)}
                    />
                  </li>
                  <li className="remove">
                    <Button
                      icon={<CloseOutlined />}
                      title="Delete"
                      onClick={e => this.onChange('delete', item, i)}
                    />
                  </li>
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default BannerMng;
