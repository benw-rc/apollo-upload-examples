/** @module */

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import './D3Path.scss';

export const line_function = (
  d3.line().x(([x,y]) => x)
           .y(([x,y]) => y)
           .curve(d3.curveLinear)
);

/**
 * Simple d3 path component that builds a line based on given a list of points.
 *
 * Accepts all options accepted by default <path> component
 *
 * @param {string} className - optional additional css class
 * @param {Number[][]} points - list of points.
 */
export const D3Path = ({ points, className, ...props }) =>
  <path
    className={classNames("d3-path", className)}
    d={line_function(points)}
    {...props}
  />

D3Path.propTypes = {
  className: PropTypes.string,
  points: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
};

export default D3Path;
