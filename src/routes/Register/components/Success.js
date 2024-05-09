import React, { Component, Fragment } from 'react';
import { Result } from 'components/Pages';
import { Layout, Button } from 'antd';
const { Content } = Layout;

export default class extends Component {
  render() {
    const actions = (
      <Fragment>
        <Button type="primary">Check your mailbox</Button>
        <Button href="/">Return to the top page</Button>
      </Fragment>
    );

    const footer = (
      <Fragment>
        <p>
          <a>Need More Help?</a>
        </p>
        <p>
          Misc question two? <a>Response Link</a>
        </p>
      </Fragment>
    );

    const extra = <div>Yoursite.com</div>;
    
    return (
      <Layout className="full-layout result-page">
        <Content>
          <Result
            title="Registration is successful"
            type="success"
            actions={actions}
            footer={footer}
            extra={extra}
          >
            An activation email has been sent to your mailbox and is valid for 24 hours. Please log in to your email address and click on the link in the email to activate your account.
          </Result>
        </Content>
      </Layout>
    );
  }
}
