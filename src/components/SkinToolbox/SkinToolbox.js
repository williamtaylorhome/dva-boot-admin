import './style/index.less';
import React, { Component } from 'react';
import cx from 'classnames';
import Icon from '../Icon';
import { Tabs } from 'antd';
import $$ from 'cmn-utils';
import SideBarBox from './SideBarBox';
import NavBarBox from './NavBarBox';
import LayoutBox from "./LayoutBox";
const TabPane = Tabs.TabPane;

/**
 * Set the right side of the skin to slide the panel
 */
class SkinToolbox extends Component {
  state = {
    collapsed: true,
  }

  onChangeSideColor = e => {
    this.props.onChangeTheme({
      ...this.props.theme,
      leftSide: e.target.value
    });
  };

  onChangeNavBarColor = e => {
    this.props.onChangeTheme({
      ...this.props.theme,
      navbar: e.target.value
    });
  };

  onChangeLayout = value => {
    this.props.onChangeTheme({
      ...this.props.theme,
      layout: value
    });
  }

  clearThemeStore = _ => {
    $$.removeStore('theme');
  }

  /**
   * Toggle the skin settings panel
   */
  toggleSkinToolbox = _ => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    const { theme } = this.props;

    const classnames = cx('skin-toolbox', {
      'skin-toolbox-close': this.state.collapsed
    });

    return (
      <div className={classnames}>
        <div className="panel">
          <div className="panel-head" onClick={this.toggleSkinToolbox}>
            <span className="panel-icon">
              <Icon type="gear" />
            </span>
            <span className="panel-title">Set up your theme</span>
          </div>
          <div className="panel-body">
            <Tabs defaultActiveKey="1" size="small">
              <TabPane tab="Navigation bar" key="navbar">
                <h4>Navigation bar style</h4>
                <NavBarBox theme={theme} onChange={this.onChangeNavBarColor} />
              </TabPane>
              <TabPane tab="Sidebar" key="sidebar">
                <h4>Sidebar style</h4>
                <SideBarBox theme={theme} onChange={this.onChangeSideColor} />
              </TabPane>
              <TabPane tab="layout" key="misc">
                <h4>Layout style</h4>
                <LayoutBox theme={theme} onChange={this.onChangeLayout} />
              </TabPane>
            </Tabs>
          </div>
          <div className="panel-footer">
            <a className="btn-primary" onClick={this.clearThemeStore}>Clean up your storage</a>
          </div>
        </div>
      </div>
    );
  }
}

export default SkinToolbox;
