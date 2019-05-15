/** @module */
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Dropdown, Label } from 'semantic-ui-react';

import './Select.scss';

/**
 * @callback change_cb
 * @param {Number|string} val - new value
 */

/**
 * Select component wraps a base Dropdown component to make a styled/themed Select box.
 * Also simplifies onChange behavior.
 * 
 * @param {string} [className] - optional additional css class
 * @param {string} [label] - optional label
 * @param {change_cb} onChange - function called on change w/ new value.
 */
export const Select = ({ className, onChange, label, ...params }) =>
  <div className={classNames("argus-select", className)}>
    { label && <Label horizontal>{label}</Label> }
    { console.log(params.options) }
    <Dropdown
      selection
      onChange={(e, d) => onChange(d.value)}
      className={classNames({ labeled: label !== undefined })}
      { ...params }
    />
  </div>

Select.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
};

export default Select;
