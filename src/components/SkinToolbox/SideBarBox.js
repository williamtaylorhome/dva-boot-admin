import React from 'react';
import { Radio, Tag } from 'antd';
const RadioGroup = Radio.Group;

export default ({ theme, onChange }) => (
  <RadioGroup
    onChange={onChange}
    value={theme.leftSide}
  >
    <Radio className="darkgrey" value="darkgrey">
      <Tag color="#30363e">Dark gray</Tag>
    </Radio>
    <Radio className="grey" value="grey">
      <Tag color="#aaa">Shallow ash</Tag>
    </Radio>
    <Radio className="dark" value="dark">
      <Tag color="#001529">Antd navy</Tag>
    </Radio>
    <Radio className="light" value="light">
      <Tag color="#efefef" style={{ color: '#666' }}>
        ANTD Bright White
      </Tag>
    </Radio>
  </RadioGroup>
)