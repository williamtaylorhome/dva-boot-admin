import React from 'react';
import { Checkbox } from 'antd';
const CheckGroup = Checkbox.Group;

/**
 * Several common layouts
 */
export default ({ theme, onChange }) => (
  <CheckGroup onChange={onChange} value={theme.layout}>
    <Checkbox className="fixedHeader" value="fixedHeader">
      Fix the head
    </Checkbox>
    <Checkbox className="fixedSidebar" value="fixedSidebar">
      Pin the sidebar
    </Checkbox>
    <Checkbox className="tabLayout" value="tabLayout">
      Label mode
    </Checkbox>
    <Checkbox className="fixedBreadcrumbs" value="fixedBreadcrumbs">
      Fix the breadcrumbs
    </Checkbox>
    <Checkbox className="hidedBreadcrumbs" value="hidedBreadcrumbs">
      Hide breadcrumbs
    </Checkbox>
  </CheckGroup>
);
