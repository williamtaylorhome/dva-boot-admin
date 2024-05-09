import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Col } from 'antd';
/**
 * Password controls
 */
export default class PasswordForm extends Component {
  static propTypes = {
    form: PropTypes.object,
    name: PropTypes.string,
    formFieldOptions: PropTypes.object,
    rules: PropTypes.array,
    placeholder: PropTypes.string,
    ComponentCol: PropTypes.node,
    ComponentItem: PropTypes.node,
    formItemLayout: PropTypes.object,
    col: PropTypes.object,
    repeat: PropTypes.bool,
    type: PropTypes.string
  };

  state = {
    confirmDirty: false
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue(this.props.name)) {
      callback('The password entered twice is inconsistent!');
    } else {
      callback();
    }
  };

  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields([this.props.name + '_repeat'], { force: true });
    }
    callback();
  };

  render() {
    const {
      form,
      name,
      formFieldOptions = {},
      rules,
      placeholder,
      type,
      formItemLayout,
      col,
      repeat,
      getPopupContainer,
      ...otherProps
    } = this.props;

    const { getFieldDecorator } = form;

    // If there are rules
    formFieldOptions.rules = [
      {
        required: true,
        message: `请输入${otherProps.title}`
      },
      {
        validator: this.checkConfirm
      }
    ];

    // If there are rules
    if (rules && rules.length) {
      formFieldOptions.rules = formFieldOptions.rules.concat(rules);
    }

    let ComponentCol = type === 'inline' ? 'div' : Col;

    return (
      <>
        <ComponentCol className="col-item col-item-password" {...col}>
          <Form.Item
            {...formItemLayout}
            label={otherProps.title}
            hasFeedback
            className="col-item-content"
          >
            {getFieldDecorator(name, formFieldOptions)(
              <Input
                type="password"
                placeholder={placeholder || `请输入${otherProps.title}`}
              />
            )}
          </Form.Item>
        </ComponentCol>
        {repeat ? (
          <ComponentCol className="col-item col-item-repeat-password" {...col}>
            <Form.Item
              {...formItemLayout}
              label={'Confirm' + otherProps.title}
              hasFeedback
              className="col-item-content"
            >
              {getFieldDecorator(name + '_repeat', {
                rules: [
                  {
                    required: true,
                    message: `Please enter it again${otherProps.title}`
                  },
                  {
                    validator: this.checkPassword
                  }
                ]
              })(
                <Input
                  type="password"
                  onBlur={this.handleConfirmBlur}
                  placeholder="The two entries must be consistent"
                />
              )}
            </Form.Item>
          </ComponentCol>
        ) : null}
      </>
    );
  }
}
