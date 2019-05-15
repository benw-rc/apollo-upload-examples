/** @module */

import _ from 'lodash';

/**
 * @callback default_to_eval_cb
 * @return - computed value.
 */

/**
 * This utility function is meant to give a way of assigning
 * a variable based on whether a given value is undefined or null.
 *
 * For cases of:
 *   let val = thing !== undefined ? thing : other_thing;
 * you would use:
 *   let val = default_to(thing, other_thing)
 *
 * If you are checking for undefined because you need to DO something with
 * the checked value, you can include a function to be evaluated at call-time.
 * The output of that function is what will be returned if the value is defined.
 *   let val = thing !== undefined ? Math.max(thing.lists[2]) : thing_2;
 *   let val = default_to(thing, thing_2, () => Math.max(thing.lists[2]))
 *
 * @function
 * @param check_value - value to be evaluated as defined or undefined.
 *   This value will be returned if it is not undefined, and
 *   value_fn is not included.
 * @param default_value - value to be returned if check_value is undefined.
 * @param [value_fn] {default_to_eval_cb} - function to be called if check_value
 *   is defined.  Its output will be returned if check_value is defined.
 * @return - If check_value is undefined, this returns the default value.
 *   Otherwise check_value is returned, unless value_fn is included, in which case
 *   its output is returned.
 */
export const default_to = (check_value, default_value, value_fn) => {
  if ((check_value == null)) {
    return default_value;
  }
  if (_.isUndefined(value_fn)) {
    return check_value;
  }
  return value_fn();
};

export default default_to;
