import React from 'react';
import PropTypes from 'prop-types';

/**
 * Allows dragging and dropping of components
 */
export default class Drag extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };
  static defaultProps = {
    //By default, the Kids DOM is moved, and overriding this method allows you to synchronize the tranform behavior externally
    updateTransform: (transformStr, tx, ty, tdom) => {
      tdom.style.transform = transformStr;
    }
  };
  position = {
    startX: 0,
    startY: 0,
    dx: 0,
    dy: 0,
    tx: 0,
    ty: 0
  };
  start = event => {
    if (event.button !== 0) {
      //Only left-click is allowed, the problem with right-click is that the mouseup event will not be triggered if you don't select conextmenu
      return;
    }
    document.addEventListener('mousemove', this.docMove);
    this.position.startX = event.pageX - this.position.dx;
    this.position.startY = event.pageY - this.position.dy;
  };
  docMove = event => {
    const tx = event.pageX - this.position.startX;
    const ty = event.pageY - this.position.startY;
    const transformStr = `translate(${tx}px,${ty}px)`;
    this.props.updateTransform(transformStr, tx, ty, this.tdom);
    this.position.dx = tx;
    this.position.dy = ty;
  };
  docMouseUp = event => {
    document.removeEventListener('mousemove', this.docMove);
  };
  componentDidMount() {
    this.tdom.addEventListener('mousedown', this.start);
    //use document Remove pairs mousemove Listener for events
    document.addEventListener('mouseup', this.docMouseUp);
  }
  componentWillUnmount() {
    this.tdom.removeEventListener('mousedown', this.start);
    document.removeEventListener('mouseup', this.docMouseUp);
    document.removeEventListener('mousemove', this.docMove);
  }
  render() {
    const { children } = this.props;
    const newStyle = {
      ...children.props.style,
      cursor: 'move',
      userSelect: 'none'
    };
    return React.cloneElement(React.Children.only(children), {
      ref: tdom => {
        return (this.tdom = tdom);
      },
      style: newStyle
    });
  }
}
