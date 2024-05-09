import React from 'react';
import EC from 'components/Charts/ECharts/EC';
import cloneDeep from 'lodash/cloneDeep';
import 'echarts/lib/chart/gauge';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

export default class Gauge extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }
  getOption = () => {
    return {
      backgroundColor: '#1b1b1b',
      tooltip: {
        formatter: '{a} <br/>{c} {b}'
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      series: [
        {
          name: 'velocity',
          type: 'gauge',
          min: 0,
          max: 220,
          splitNumber: 11,
          radius: '70%',
          axisLine: {
            // Coordinate axes
            lineStyle: {
              // attribute line style Controls the line style
              color: [[0.09, 'lime'], [0.82, '#1e90ff'], [1, '#ff4500']],
              width: 3,
              shadowColor: '#fff', //Transparent by default
              shadowBlur: 10
            }
          },
          axisLabel: {
            // Small axis markers
            textStyle: {
              // attribute line style Controls the line style
              fontWeight: 'bolder',
              color: '#fff',
              shadowColor: '#fff', //Transparent by default
              shadowBlur: 10
            }
          },
          axisTick: {
            // Small axis markers
            length: 15, // The length attribute controls the line length
            lineStyle: {
              // attribute line style Controls the line style
              color: 'auto',
              shadowColor: '#fff', //Transparent by default
              shadowBlur: 10
            }
          },
          splitLine: {
            // Dividers
            length: 25, // The length attribute controls the line length
            lineStyle: {
              // attribute line style Controls the line style
              width: 3,
              color: '#fff',
              shadowColor: '#fff', //Transparent by default
              shadowBlur: 10
            }
          },
          pointer: {
            // Dividers
            shadowColor: '#fff', //Transparent by default
            shadowBlur: 5
          },
          title: {
            textStyle: {
              // The rest of the properties use the global text style by default, see textstyle for details
              fontWeight: 'bolder',
              fontSize: 20,
              fontStyle: 'italic',
              color: '#fff',
              shadowColor: '#fff', //Transparent by default
              shadowBlur: 10
            }
          },
          detail: {
            backgroundColor: 'rgba(30,144,255,0.8)',
            borderWidth: 1,
            borderColor: '#fff',
            shadowColor: '#fff', //Transparent by default
            shadowBlur: 5,
            offsetCenter: [0, '50%'], // x, y, in px
            textStyle: {
              // The rest of the properties use the global text style by default, see textstyle for details
              fontWeight: 'bolder',
              color: '#fff'
            }
          },
          data: [{ value: 40, name: 'km/h' }]
        },
        {
          name: 'rotate speed',
          type: 'gauge',
          center: ['25%', '55%'], // The default global center
          radius: '50%',
          min: 0,
          max: 7,
          endAngle: 45,
          splitNumber: 7,
          axisLine: {
            // Coordinate axes
            lineStyle: {
              // attribute line style Controls the line style
              color: [[0.29, 'lime'], [0.86, '#1e90ff'], [1, '#ff4500']],
              width: 2,
              shadowColor: '#fff', //Transparent by default
              shadowBlur: 10
            }
          },
          axisLabel: {
            // Small axis markers
            textStyle: {
              // attribute line style Controls the line style
              fontWeight: 'bolder',
              color: '#fff',
              shadowColor: '#fff', //Transparent by default
              shadowBlur: 10
            }
          },
          axisTick: {
            // Small axis markers
            length: 12, // The length attribute controls the line length
            lineStyle: {
              // attribute line style Controls the line style
              color: 'auto',
              shadowColor: '#fff', //Transparent by default
              shadowBlur: 10
            }
          },
          splitLine: {
            // Dividers
            length: 20, // The length attribute controls the line length
            lineStyle: {
              // attribute line style Controls the line style
              width: 3,
              color: '#fff',
              shadowColor: '#fff', //Transparent by default
              shadowBlur: 10
            }
          },
          pointer: {
            width: 5,
            shadowColor: '#fff', //Transparent by default
            shadowBlur: 5
          },
          title: {
            offsetCenter: [0, '-30%'], // x, y, in px
            textStyle: {
              // The rest of the properties use the global text style by default, see textstyle for details
              fontWeight: 'bolder',
              fontStyle: 'italic',
              color: '#fff',
              shadowColor: '#fff', //Transparent by default
              shadowBlur: 10
            }
          },
          detail: {
            //backgroundColor: 'rgba(30,144,255,0.8)',
// borderWidth: 1,
            borderColor: '#fff',
            shadowColor: '#fff', //Transparent by default
            shadowBlur: 5,
            width: 80,
            height: 30,
            offsetCenter: [25, '20%'], // x, y, in px
            textStyle: {
              // The rest of the properties use the global text style by default, see textstyle for details
              fontWeight: 'bolder',
              color: '#fff'
            }
          },
          data: [{ value: 1.5, name: 'x1000 r/min' }]
        },
        {
          name: 'Fuel gauge',
          type: 'gauge',
          center: ['75%', '50%'], // The default global center
          radius: '50%',
          min: 0,
          max: 2,
          startAngle: 135,
          endAngle: 45,
          splitNumber: 2,
          axisLine: {
            // Coordinate axes
            lineStyle: {
              // attribute line style Controls the line style
              color: [[0.2, 'lime'], [0.8, '#1e90ff'], [1, '#ff4500']],
              width: 2,
              shadowColor: '#fff', //Transparent by default
              shadowBlur: 10
            }
          },
          axisTick: {
            // Small axis markers
            length: 12, // The length attribute controls the line length
            lineStyle: {
              // attribute line style Controls the line style
              color: 'auto',
              shadowColor: '#fff', //Transparent by default
              shadowBlur: 10
            }
          },
          axisLabel: {
            textStyle: {
              // attribute line style Controls the line style
              fontWeight: 'bolder',
              color: '#fff',
              shadowColor: '#fff', //Transparent by default
              shadowBlur: 10
            },
            formatter: function(v) {
              switch (v + '') {
                case '0':
                  return 'E';
                case '1':
                  return 'Gas';
                case '2':
                  return 'F';
                default:
                  break;
              }
            }
          },
          splitLine: {
            // Dividers
            length: 15, // The length attribute controls the line length
            lineStyle: {
              // attribute line style Controls the line style
              width: 3,
              color: '#fff',
              shadowColor: '#fff', //Transparent by default
              shadowBlur: 10
            }
          },
          pointer: {
            width: 2,
            shadowColor: '#fff', //Transparent by default
            shadowBlur: 5
          },
          title: {
            show: false
          },
          detail: {
            show: false
          },
          data: [{ value: 0.5, name: 'gas' }]
        },
        {
          name: 'water meter',
          type: 'gauge',
          center: ['75%', '50%'], // The default global center
          radius: '50%',
          min: 0,
          max: 2,
          startAngle: 315,
          endAngle: 225,
          splitNumber: 2,
          axisLine: {
            // Coordinate axes
            lineStyle: {
              // attribute line style Controls the line style
              color: [[0.2, 'lime'], [0.8, '#1e90ff'], [1, '#ff4500']],
              width: 2,
              shadowColor: '#fff', //Transparent by default
              shadowBlur: 10
            }
          },
          axisTick: {
            // Small axis markers
            show: false
          },
          axisLabel: {
            textStyle: {
              // attribute line style Controls the line style
              fontWeight: 'bolder',
              color: '#fff',
              shadowColor: '#fff', //Transparent by default
              shadowBlur: 10
            },
            formatter: function(v) {
              switch (v + '') {
                case '0':
                  return 'H';
                case '1':
                  return 'Water';
                case '2':
                  return 'C';
                default:
                  break;
              }
            }
          },
          splitLine: {
            // Dividers
            length: 15, // The length attribute controls the line length
            lineStyle: {
              // attribute line style Controls the line style
              width: 3,
              color: '#fff',
              shadowColor: '#fff', //Transparent by default
              shadowBlur: 10
            }
          },
          pointer: {
            width: 2,
            shadowColor: '#fff', //Transparent by default
            shadowBlur: 5
          },
          title: {
            show: false
          },
          detail: {
            show: false
          },
          data: [{ value: 0.5, name: 'gas' }]
        }
      ]
    };
  };

  timeTicket = null;
  getInitialState = () => ({ option: this.getOption() });

  componentDidMount() {
    if (this.timeTicket) {
      clearInterval(this.timeTicket);
    }
    this.timeTicket = setInterval(() => {
      const option = cloneDeep(this.state.option);
      option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
      option.series[1].data[0].value = (Math.random() * 7).toFixed(2) - 0;
      option.series[2].data[0].value = (Math.random() * 2).toFixed(2) - 0;
      option.series[3].data[0].value = (Math.random() * 2).toFixed(2) - 0;
      this.setState({ option: option });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.timeTicket) {
      clearInterval(this.timeTicket);
    }
  }

  render() {
    return (
      <EC option={this.state.option} />
    );
  }
}
