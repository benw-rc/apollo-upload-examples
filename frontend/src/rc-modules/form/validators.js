/** @module */

import _ from 'lodash';

import * as validators from './validators';

/**
 * Returns error if empty string or undefined
 * 
 * @function
 * @param val - value to check
 * @param label - data value label to display in error
 * @return {Object} - error response
 */
export const empty = (val, label) => {
  return (val === '' || val === undefined)
    ? { error: true, message: validators.empty_message(label) }
    : { error: false };
}
export const empty_message = (label) => `${label} required`;

/**
 * Returns error if contains invalid characters for a name field
 * 
 * @function
 * @param val - value to check
 * @param label - data value label to display in error
 * @return {Object} - error response
 */
export const name_chars = (val, label) =>
  (!/^[0-9a-z_]*$/.test(val)) 
    ? { error: true, message: validators.name_chars_message(label)}
    : { error: false };

export const name_chars_message = (label) => `${label} can only contain [a-z, 0-9, _]`;

export const max_length = (val, label, max) => {
  return (val.length >= max)
    ? { error: true, message: validators.max_length_message(label, max) }
    : { error: false };
}

export const max_length_message = (label, max) => `${label} must have a max length of ${max}`;

export const empty_fields = (val, label) => {
  return (_.every(Object.values(val), v => v !== ''))
    ? { error: false }
    : { error: true, message: validators.empty_fields_message(label) }
};

export const empty_fields_message = (label) => `${label} should not have any missing fields`;

/**
 * Returns a compiled error object from a list of errors
 * duplicates have their messages appended to a list for that error type.
 *
 * @function
 * @param {Object[]} errors - list of error responses
 * @return {Object} - error response
 */
export const reduce_errors = (errors) => {
  let error = _.some(errors, (e) => e.error);
  if (!error) {
    return { error };
  }
  return {
    error,
    messages: errors.filter(e => e.error).reduce(
      (obj, e) => e.message ? [ ...obj, e.message ] : [ ...obj, ...e.messages],
      []
    ),
  };
}

/**
 * Returns compiled errors from empty and name_chars validators.
 * 
 * @function
 * @param val - value to check
 * @param label - data value label to display in error
 * @return {Object} - error response
 */
export const name = (val, label) => {
  return validators.reduce_errors([
    validators.empty(val, label),
    validators.name_chars(val, label)
  ]);
}
