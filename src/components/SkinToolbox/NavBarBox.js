import React from 'react';
import { Radio, Tag } from 'antd';
const RadioGroup = Radio.Group;

export default ({ theme, onChange }) => (
  <RadioGroup
    onChange={onChange}
    value={theme.navbar}
  >
    <Radio className="primary" value="primary">
      <Tag color="#1890ff">default</Tag>
    </Radio>
    <Radio className="light" value="light">
      <Tag color="#b9b9b9">light</Tag>
    </Radio>
    <Radio className="info" value="info">
      <Tag color="#00bcd4">jewel</Tag>
    </Radio>
    <Radio className="warning" value="warning">
      <Tag color="#ffc107">Sunlight</Tag>
    </Radio>
    <Radio className="danger" value="danger">
      <Tag color="#f44336">enthusiastic</Tag>
    </Radio>
    <Radio className="alert" value="alert">
      <Tag color="#a992e2">elegance</Tag>
    </Radio>
    <Radio className="system" value="system">
      <Tag color="#48c9a9">specialized</Tag>
    </Radio>
    <Radio className="success" value="success">
      <Tag color="#85d27a">life</Tag>
    </Radio>
    <Radio className="grey" value="grey">
      <Tag color="#30363e">Business</Tag>
    </Radio>
    <Radio className="dark" value="dark">
      <Tag color="#001529">Blue</Tag>
    </Radio>
  </RadioGroup>
)