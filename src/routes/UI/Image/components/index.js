import React from 'react';
import { connect } from 'dva';
import { Layout, Button } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
import Image from 'components/Image';
const { Content } = Layout;

@connect()
export default class extends BaseComponent {
  render() {
    return (
      <Layout className="full-layout page base-component-page">
        <Content>
          <Panel title="Image / Image">
            <p>Image-related components</p>
          </Panel>
          <Panel title="Picture preview">
            <Image
              style={{ width: 200 }}
              src="https://www.foodiesfeed.com/wp-content/uploads/2015/09/summer-juicy-beef-burger.jpg"
              previewList={[
                'https://www.foodiesfeed.com/wp-content/uploads/2017/05/juicy-burger-in-a-vibrant-interior.jpg',
                'https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made.jpg',
                'https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-pancakes.jpg'
              ]}
            />
          </Panel>
        </Content>
      </Layout>
    );
  }
}
