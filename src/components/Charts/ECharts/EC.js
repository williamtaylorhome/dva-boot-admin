import React, { Component } from 'react';
import PropTypes from 'prop-types';
import echarts from 'echarts/lib/echarts';
import resizeMe from '@/decorator/resizeMe';
import isEqual from 'react-fast-compare';

/**
 * Based on ECharts 4 of simple encapsulation fork from https://github.com/hustcc/echarts-for-react/blob/master/src/core.jsx
 */
@resizeMe({ refreshRate: 50 })
class ECharts extends Component {
  componentDidMount() {
    this.rerender();
  }

  componentDidUpdate(prevProps) {
    // When the following properties are modified, you need to dispose before creating a new one
// 1. When switching themes
// 2. When modifying opts
// 3. When you modify onEvents, you can cancel all previously bound events issue #151
    if (
      prevProps.theme !== this.props.theme ||
      !isEqual(prevProps.opts, this.props.opts) ||
      !isEqual(prevProps.onEvents, this.props.onEvents)
    ) {
      this.dispose();

      this.rerender(); // reconstruction
      return;
    }

    // When the size is changed, the style may be changed, which may cause the size to change, so trigger resize
    if (
      !isEqual(prevProps.size, this.props.size) ||
      !isEqual(prevProps.style, this.props.style) ||
      !isEqual(prevProps.className, this.props.className)
    ) {
      try {
        this.echartObj.resize();
      } catch (e) {
        console.warn(e);
      }
    }

    // When these properties remain unchanged, setOption is not used
    const pickKeys = [
      'option',
      'notMerge',
      'lazyUpdate',
      'showLoading',
      'loadingOption'
    ];
    if (!pickKeys.some(item => !isEqual(prevProps[item], this.props[item]))) {
      return;
    }

    // It is up to the developer to determine whether setOption is required. Defaults to true
    if (!this.props.shouldSetOption(prevProps, this.props)) {
      return;
    }

    this.echartObj = this.renderEchartDom();
  }

  // Remove
  componentWillUnmount() {
    this.dispose();
  }

  // return the echart object
  getEchartsInstance = () =>
    echarts.getInstanceByDom(this.echartsElement) ||
    echarts.init(this.echartsElement, this.props.theme, this.props.opts);

  // arranged echarts
  dispose = () => {
    if (this.echartsElement) {
      // disposes of echarts instance
      echarts.dispose(this.echartsElement);
    }
  };

  rerender = () => {
    const { onEvents, onChartReady } = this.props;

    this.echartObj = this.renderEchartDom();
    this.bindEvents(this.echartObj, onEvents || {});

    // on chart ready
    if (typeof onChartReady === 'function')
      this.props.onChartReady(this.echartObj);
  };

  // bind the events
  bindEvents = (instance, events) => {
    const _bindEvent = (eventName, func) => {
      // ignore the event config which not satisfy
      if (typeof eventName === 'string' && typeof func === 'function') {
        // binding event
// instance.off(eventName); //It's already disposed in rebuild, so there's no need to OFF the operation
        instance.on(eventName, param => {
          func(param, instance);
        });
      }
    };

    // loop and bind
    for (const eventName in events) {
      if (Object.prototype.hasOwnProperty.call(events, eventName)) {
        _bindEvent(eventName, events[eventName]);
      }
    }
  };

  // render the dom
  renderEchartDom = () => {
    // init the echart object
    const echartObj = this.getEchartsInstance();
    // set the echart option
    echartObj.setOption(
      this.props.option,
      this.props.notMerge || false,
      this.props.lazyUpdate || false
    );
    // set loading mask
    if (this.props.showLoading)
      echartObj.showLoading(this.props.loadingOption || null);
    else echartObj.hideLoading();

    return echartObj;
  };

  render() {
    const { size, style, id, className } = this.props;
    const { width, height } = size;

    const newStyle = {
      height,
      width,
      ...style
    };

    return (
      <div
        ref={e => {
          this.echartsElement = e;
        }}
        style={newStyle}
        id={id}
        className={className}
      />
    );
  }
}

ECharts.propTypes = {
  option: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  echarts: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  notMerge: PropTypes.bool,
  lazyUpdate: PropTypes.bool,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  className: PropTypes.string,
  theme: PropTypes.string,
  onChartReady: PropTypes.func,
  showLoading: PropTypes.bool,
  loadingOption: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onEvents: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  opts: PropTypes.shape({
    devicePixelRatio: PropTypes.number,
    renderer: PropTypes.oneOf(['canvas', 'svg']),
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf([null, undefined, 'auto'])
    ]),
    height: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf([null, undefined, 'auto'])
    ]),
  }),
  shouldSetOption: PropTypes.func,
};

ECharts.defaultProps = {
  echarts: {},
  notMerge: false,
  lazyUpdate: false,
  style: {},
  className: '',
  theme: null,
  onChartReady: () => {},
  showLoading: false,
  loadingOption: null,
  onEvents: {},
  opts: {},
  shouldSetOption: () => true,
};

export { echarts };
export default ECharts;
