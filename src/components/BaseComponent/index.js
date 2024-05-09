import React from 'react';
import { Modal } from 'antd';
import $$ from 'cmn-utils';
import config from '@/config';

class BaseComponent extends React.Component {
  notice = config.notice; // Message notifications

  /**
   * history api Route redirects
   */
  get history() { 
    return this.props.history;
  }

  /**
   * New
   */
  onAdd = () => {
    this.setState({
      record: null,
      visible: true
    });
  };

  /**
   * revise
   * @param {object} Form records
   */
  onUpdate = record => {
    this.setState({
      record,
      visible: true
    });
  };

  /**
   * Delete
   * @param {object | array} Form records, arrays when deleted in bulk
   */
  onDelete = record => {
    if (!record) return;
    if ($$.isArray(record) && !record.length) return;

    const content = `Do you want to delete this ${
      $$.isArray(record) ? record.length : ''
    } Item?`;

    Modal.confirm({
      title: 'caution',
      content,
      onOk: () => {
        this.handleDelete($$.isArray(record) ? record : [record]);
      },
      onCancel() {}
    });
  };

  handleAdd() {
    /* Subclass rewrites*/
  }
  handleUpdate() {
    /* Subclass rewrites*/
  }
  handleDelete(records) {
    /* Subclass rewrites*/
  }
}

export default BaseComponent;
