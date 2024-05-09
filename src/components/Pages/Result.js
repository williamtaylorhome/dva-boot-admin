import React from 'react';
import { Layout, Row, Col } from 'antd';
import Icon from '../Icon';
import cx from 'classnames';
const { Content } = Layout;

const type2icon = {
  success: 'check',
  error: 'close',
  warning: 'exclamation',
  info: 'info'
};
/**
 * The results show the components
 */
export default ({
  title, // title
  extra, // Content to the right of the title
  icon, // icon to the left of the title,
  type, // Default icon success error warning info
  description, // Text below the title
  actions, // button at the bottom of the content
  footer, // Text below the content
  style,
  children, // body
  className
}) => {
  const classNames = cx('full-layout', 'result-fragment', className);

  let titleIcon = icon;
  if (type && type2icon[type] && !icon) {
    titleIcon = <Icon type={type2icon[type]} />;
  }

  return (
    <Layout className={classNames} style={style}>
      <Content>
        <div className="center-block">
          <div className="result-header">
            <Row type="flex" align="bottom">
              <Col span={extra ? 16 : 24}>
                <div className={cx('title', type)}>
                  {titleIcon} {title}
                </div>
              </Col>
              <Col span={extra ? 8 : 0}>
                <div className="extra">{extra}</div>
              </Col>
            </Row>
            {description ? (
              <div className="description">{description}</div>
            ) : null}
          </div>
          <div className="result-body">
            {children}
            {actions ? <div className="action-btns">{actions}</div> : null}
          </div>
          <div className="result-footer">{footer}</div>
        </div>
      </Content>
    </Layout>
  );
};
