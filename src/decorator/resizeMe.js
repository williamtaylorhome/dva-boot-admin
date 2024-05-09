import React, { PureComponent } from 'react';
import ResizeSensor from 'css-element-queries/src/ResizeSensor';
import $$ from 'cmn-utils';
const { debounce, throttle } = $$;

/**
 * Adding this decorator to a class can listen for changes in the size of the component.
 * The wrapped class will be injected into the width and height of the component in porps
 * The onResize function can be used in the parent function component
 * @param {*} config
 */
const defaultConfig = {
  refreshRate: 16, // Frequency of calls
  refreshMode: 'throttle' // Functions, which can only be throttling or stabilization functions[throttle | debounce]
};

const resizeMe = (config = defaultConfig) => {
  const refreshFunc = config.refreshMode === 'throttle' ? throttle : debounce;

  return WrappedComponent => {
    return class extends PureComponent {
      constructor(props) {
        super(props);
        this.onResizeStrategy = refreshFunc(this.onResize, config.refreshRate);
        this.state = {
          width: undefined,
          height: undefined,
          position: undefined
        };
      }

      componentDidMount() {
        const element = this.element.parentNode;
        this.resizeSensor = new ResizeSensor(element, this.onResizeStrategy);
        this.onResizeStrategy();
      }

      componentWillUnmount() {
        const element = this.element.parentNode;
        this.resizeSensor.detach(element, this.onResizeStrategy);
      }

      onResize = () => {
        if (!this.element) return;

        const element = this.element.parentNode;
        const { onResize } = this.props;
        const {
          width,
          height,
          paddingLeft,
          paddingRight,
          paddingTop,
          paddingBottom
        } = getComputedStyle(element);

        const size = {
          width:
            parseInt(width, 10) -
            parseInt(paddingLeft, 10) -
            parseInt(paddingRight, 10),
          height:
            parseInt(height, 10) -
            parseInt(paddingTop, 10) -
            parseInt(paddingBottom, 10)
        };
        this.setState(size);

        onResize && onResize(size);
      };

      render() {
        const { width, height } = this.state;
        const { className, ...otherProps } = this.props;
        const styles = {
          position: 'relative',
          width: '100%',
          height: '100%'
        };
        return (
          <div
            ref={node => (this.element = node)}
            style={styles}
            className={className}
          >
            {width && height ? (
              <WrappedComponent {...otherProps} size={{ ...this.state }} />
            ) : null}
          </div>
        );
      }
    };
  };
};

export default resizeMe;
