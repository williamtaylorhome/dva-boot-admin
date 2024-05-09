import React, { Component } from 'react';
import cx from 'classnames';
import './style/ripple.less';

/**
 * imitate material design ripple effect
 */
class Ripple extends Component {
  onClick = e => {
    this.createRipple(e);
  };

  createRipple = e => {
    const btnWidth = this.element.clientWidth;
    const rect = this.element.getBoundingClientRect();
    const btnOffsetTop = rect.top;
    const btnOffsetLeft = rect.left;
    const posMouseX = e.pageX;
    const posMouseY = e.pageY;
    const rippleX = posMouseX - btnOffsetLeft;
    const rippleY = posMouseY - btnOffsetTop;

    const rippleAnimate = document.createElement('div');
    rippleAnimate.className = 'ripple-animate';
    const baseStyle = `
      top: ${rippleY - btnWidth}px; 
      left: ${rippleX - btnWidth}px; 
      width: ${btnWidth * 2}px; 
      height: ${btnWidth * 2}px;
    `;
    rippleAnimate.style.cssText = baseStyle;
    this.element.appendChild(rippleAnimate);

    setTimeout(() => {
      requestAnimationFrame(() => {
        rippleAnimate.style.cssText =
          baseStyle +
          ' transform: scale(1); -webkit-transition: scale(1); opacity: 0;';
      });
    }, 50); // If you don't add a delay, sometimes the animation won't take effect, but I didn't find a reason

    setTimeout(() => {
      rippleAnimate.remove();
    }, 750);
  };

  render() {
    const { children, type, ghost, ...otherProps } = this.props;
    return (
      <a
        ref={node => (this.element = node)}
        className={cx('ripple-btn', type, { ghost })}
        {...otherProps}
        onClick={this.onClick}
      >
        <span>{children}</span>
      </a>
    );
  }
}

export default Ripple;
