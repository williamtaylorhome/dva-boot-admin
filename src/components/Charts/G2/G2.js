import React, { PureComponent } from 'react';
import * as BizCharts from 'bizcharts';
import resizeMe from '@/decorator/resizeMe';
const { Chart } = BizCharts;

/**
 * The main purpose of rewriting BizCharts' charts is to pass in external sizes
 * BizCharts has encapsulated g2 very well, and the best way to use it is not to reinvent the wheel, but to quickly use the examples from the official website and display them perfectly in our framework
 * So we didn't build new Bar, Line, Pie and other components to increase the cost of use and learning :)
 */
@resizeMe({ refreshRate: 50 })
class Charts extends PureComponent {
  onGetG2Instance = chart => {
    this.chart = chart;
  }

  render() {
    const { size, children, ...otherProps } = this.props;
    const { width, height } = size;

    return (
      <Chart 
        height={height} 
        width={width} 
        padding={'auto'} 
        {...otherProps}
        onGetG2Instance={(chart) => {
          this.chart = chart;
        }}
      >
        {children}
      </Chart>
    );
  }
}

export default {
  ...BizCharts,
  Chart: Charts
};
