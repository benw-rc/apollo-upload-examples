/** @module */

import React from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';

import './FormErrors.scss';

/**
 * Component to tie into forms for validation.
 * Forward a form component's errors and show_errors state values to this component
 * and then simply update those accordingly to manage the content and visibility
 * of the errors.
 *
 * @param {string} className - optional additional css classnames
 * @param {string[]} errors - list of error strings
 * @param {boolean} show - should show errors?
 */
export const FormErrors = ({ className, errors, show }) => {
  if (!show || errors.length === 0) {
    return <div />;
  }
  return (
    <Message
      negative
      content={<ul>{errors.map((e, i) => <li key={i}>{e}</li>)}</ul>}
      className={className}
    />
  );
}

FormErrors.propTypes = {
  className: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.string),
  show: PropTypes.bool,
};

export default FormErrors;
