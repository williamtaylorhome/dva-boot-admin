import React from 'react';
import G2 from 'components/Charts/G2';
const { Chart, Axis, Geom, Tooltip, Legend } = G2;

const gender = ['male', 'female'];
function getNumberInNormalDistribution(mean, std_dev) {
  return mean + randomNormalDistribution() * std_dev;
}

function randomNormalDistribution() {
  var u = 0.0,
    v = 0.0,
    w = 0.0,
    c = 0.0;
  do {
    //Two (1,1) independent random variables were obtained
    u = Math.random() * 2 - 1.0;
    v = Math.random() * 2 - 1.0;
    w = u * u + v * v;
  } while (w === 0.0 || w >= 1.0);
  //This is the Box-Muller conversion
  c = Math.sqrt((-2 * Math.log(w)) / w);
  //Returns 2 standard normally distributed random numbers, encapsulated into an array
//Of course, because this function runs faster, you can also throw one away
//return [u*c,v*c];
  return (u * c).toFixed(2);
}

function genData(n) {
  const data = [];
  for (let index = 0; index < n; index++) {
    data.push({
      gender: gender[index % 2],
      height: getNumberInNormalDistribution(180, 20),
      weight: getNumberInNormalDistribution(70, 20)
    });
  }
  return data;
}

export default props => (
  <Chart data={genData(500)} forceFit>
    <Tooltip
      showTitle={false}
      crosshairs={{ type: 'cross' }}
      itemTpl="<li data-index={index} style=&quot;margin-bottom:4px;&quot;><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}<br/>{value}</li>"
    />
    <Axis name="height" />
    <Axis name="weight" />
    <Legend />
    <Geom
      type="point"
      position="height*weight"
      color="gender"
      opacity={0.65}
      shape="circle"
      size={4}
      tooltip={[
        'gender*height*weight',
        (gender, height, weight) => {
          return {
            name: gender,
            value: height + '(cm), ' + weight + '(kg)'
          };
        }
      ]}
    />
  </Chart>
);
