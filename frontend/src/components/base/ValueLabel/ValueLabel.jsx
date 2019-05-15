/** @module */

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Component from '../Component';
import Input from '../Input';

/**
 * ValueLabel component provides readonly input for labeled value readouts.
 *
 * @param {string} label - left_label
 * @param {string} units - right_label
 * @param {Number|string} value - current value
 * @param {string} [className] - additional css class.
 */
export class ValueLabel extends Component {
  render() {
    const { label, value, units, className } = this.props;
    return (
      <Input
        className={classNames("argus-value-label", className)}
        left_label={label}
        value={value}
        right_label={units}
        readonly
      />
    );
  }
}

ValueLabel.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  units: PropTypes.string,
  className: PropTypes.string,
};

export default ValueLabel;
