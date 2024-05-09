import React, { Component, Fragment } from 'react';
import { Result } from 'components/Pages';
import { Layout, Button } from 'antd';
const { Content } = Layout;

export default class extends Component {
  render() {
    const actions = (
      <Fragment>
        <Button type="primary">Return to the list</Button>
        <Button>View the project</Button>
        <Button>Printing</Button>
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
            title="The submission was successful"
            type="success"
            actions={actions}
            footer={footer}
            extra={extra}
            description={'Need support? We\'re here to help!'}
          >
            The Submit Result page is used to provide feedback on the processing results of a series of operation tasks, and is used if it is only a simple operation
            Message is just a global prompt for feedback.
            This text area can display simple supplementary notes, if there is a similar display
            For the requirements of "documents", the following gray area can present more complex content.
          </Result>
        </Content>
      </Layout>
    );
  }
}
