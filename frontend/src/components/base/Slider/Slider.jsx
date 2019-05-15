/** @module */

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import BootstrapSlider from 'react-bootstrap-slider';

import './Slider.scss';

/**
 * @callback slider_cb
 * @param {Number} - new value
 */

/**
 * Slider component adds some styling to BootstrapSlider.
 *
 * @param {slider_cb} change - function called on change w/ new value
 * @param {slider_cb} slideStop - function caleld on slideStop w/ new value
 * @param {string} className - optional additional css class
 */
export const Slider = ({
  className,
  change,
  slideStop,
  ...props, 
}) =>
  <BootstrapSlider
    className={classNames('argus-slider', className)}
    handle="square"
    change={e => change(e.target.value)}
    slideStop={e => slideStop(e.target.value)}
    { ...props }
  />

Slider.propTypes = {
  className: PropTypes.string,
  change: PropTypes.func,
};
Slider.defaultProps = {
  change: (val) => ({}),
  slideStop: (val) => ({}),
};

export default Slider;
