import React, { Component } from 'react';
import { connect, router } from 'dva';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Button, Input, Checkbox, Spin, Form } from 'antd';
import logoImg from 'assets/images/logo1.png';
import './index.less';
const { Link } = router;
const { Content } = Layout;
const FormItem = Form.Item;

@connect(({ login, loading }) => ({
  login,
  loading: loading.models.login
}))
export default class Login extends Component {
  handleSubmit = values => {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/login',
      payload: values
    });
  };

  render() {
    const { loading } = this.props;

    return (
      <Layout className="full-layout login-page">
        <Content>
          <Spin tip="Logging in..." spinning={!!loading}>
            <Form onFinish={this.handleSubmit} className="login-form" initialValues={{ userName: 'admin', password: 'admin', remember: true }}>
              <div className="user-img">
                <img src={logoImg} alt="logo" />
                <b>LANIF</b>
                <span>Admin</span>
              </div>
              <FormItem name="userName" rules={[{ required: true, message: 'Please enter your username, example admin' }]}>
                <Input
                  size="large"
                  prefix={<UserOutlined />}
                  placeholder="Username"
                />
              </FormItem>
              <FormItem name="password" rules={[{ required: true, message: 'Please enter your password, example admin' }]}>
                <Input
                  size="large"
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="password"
                />
              </FormItem>
              <FormItem name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </FormItem>
              <Link className="login-form-forgot" to="#">
                Forgot password
                </Link>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                login
                </Button>
              <div className="new-user">
                New user?<Link to="/sign/register">Register now</Link>
              </div>
            </Form>
          </Spin>
        </Content>
      </Layout>
    );
  }
}
