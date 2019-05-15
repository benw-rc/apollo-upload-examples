/** @module */

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Component from '../Component';
import { should_update } from 'rc-modules/react';
import CanvasAPI from './api';

import './Canvas.scss';

/**
 * @callback mouse_evt_cb
 * @param {Number[]} coordinates - event coordinates.
 */

/**
 * @callback zoom_cb
 * @param {Object} transform - new transform
 */

/**
 * Canvas component wraps a simple canvas and provides a number of
 * access features to its context, while also attaching a zoom/pan
 * listener.
 * 
 * When attaching a ref to this component, you gain direct access to:
 * - this.canvas - ref to internal canvas
 * - this.d3_canvas - d3 reference to canvas
 * - this.ctx - canvas context
 * - this.fit_to_screen() - resize content back to canvas size.
 *
 * @param {Number} height - canvas height (pixels)
 * @param {Number} width - canvas width (pixels)
 * @param {mouse_evt_cb} onmousemove - function to be called with
 *   the mouse position of mousemove events.
 * @param {mouse_evt_cb} onmouseout - function to be called on mouseout events.
 * @param {zoom_cb} onzoom - function to be called with new transform on drag/zoom
 */
export class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transform: { x: 0, y: 0, k: 1 },
    }
    this.canvas = new CanvasAPI(this);
  }
  shouldComponentUpdate(prevProps, prevState) {
    return should_update(this, prevProps, prevState);
  }
  componentDidMount() {
    this.canvas.initialize();
  }
  render() {
    const { className, height, width } = this.props;
    return (
      <div
        className={classNames('argus-canvas', className)}
        style={{width: `${width}px`, height: `${height}px`}}
      >
        <canvas ref="canvas" width={width} height={height} />
      </div>
    );
  }
}

Canvas.propTypes = {
  height: PropTypes.number,
  onmousemove: PropTypes.func,
  onmouseout: PropTypes.func,
  on_zoom: PropTypes.func,
  width: PropTypes.number,
};
Canvas.defaultProps = {
  on_zoom: () => ({}),
  onmousemove: () => ({}),
  onmouseout: () => ({}),
}

export default Canvas;
