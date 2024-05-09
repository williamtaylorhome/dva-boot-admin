import React from 'react';
import EC from 'components/Charts/ECharts/EC';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

export default class Events extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cnt: 0
    };
  }
  getOption = () => ({
    title: {
      text: 'The source from which a site user accessed',
      subtext: 'Pure fiction',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['Direct access', 'Email marketing', 'Affiliate Advertising', 'Video ads', 'search engine']
    },
    series: [
      {
        name: 'Access source',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          { value: 335, name: 'Direct access' },
          { value: 310, name: 'Email marketing' },
          { value: 234, name: 'Affiliate Advertising' },
          { value: 135, name: 'Video ads' },
          { value: 1548, name: 'search engine' }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });

  onChartClick = (param, echarts) => {
    console.log(param, echarts);
    alert('chart click');
    this.setState({
      cnt: this.state.cnt + 1
    });
  };

  onChartLegendselectchanged = (param, echart) => {
    console.log(param, echart);
    alert('chart legendselectchanged');
  };

  onChartReady = echarts => {
    console.log('echart is ready', echarts);
  };

  render() {
    let onEvents = {
      click: this.onChartClick,
      legendselectchanged: this.onChartLegendselectchanged
    };

    return (
      <EC
        option={this.getOption()}
        onChartReady={this.onChartReady}
        onEvents={onEvents}
      />
    );
  }
}
