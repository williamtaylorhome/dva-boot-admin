import React from 'react';
import G2 from 'components/Charts/G2';
import DataSet from '@antv/data-set';
const { Chart, Axis, Geom, Tooltip, Legend, Coord } = G2;

const data = [
  { State: 'WY', 小于5岁: 25635, '5 to 13 years old': 1890, '14 to 17 years old': 9314 },
  { State: 'DC', 小于5岁: 30352, '5 to 13 years old': 20439, '14 to 17 years old': 10225 },
  { State: 'VT', 小于5岁: 38253, '5 to 13 years old': 42538, '14 to 17 years old': 15757 },
  { State: 'ND', 小于5岁: 51896, '5 to 13 years old': 67358, '14 to 17 years old': 18794 },
  { State: 'AK', 小于5岁: 72083, '5 to 13 years old': 85640, '14 to 17 years old': 22153 }
];

const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['小于5岁', '5 to 13 years old', '14 to 17 years old'], // Expand the field set
  key: 'Age group', // Key field
  value: 'Population Quantity', // Value field
  retains: ['State'] // Reserved field sets, which default to all fields except fields
});

export default props => (
  <Chart data={dv} forceFit>
    <Legend />
    <Coord transpose />
    <Axis name="State" label={{ offset: 12 }} />
    <Axis name="Population Quantity" />
    <Tooltip />
    <Geom type="intervalStack" position="State*Population Quantity" color={'Age group'} />
  </Chart>
);
