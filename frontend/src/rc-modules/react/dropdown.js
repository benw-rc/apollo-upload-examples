import { default_to } from 'rc-modules/common';

/**
 * @function
 * Simple shorthand for making a valid option for a react dropdown element.
 *
 * Takes a string for the text and value fields and returns a valid {text, value}
 * object for use in a list of dropdown options.
 * If no value is passed, the first argument is used for both.
 *
 * @param {string} text - display text (and default value)
 * @param {string|number} [key] - unique key
 * @param {string} [value] - submission value
 * @return {object} - valid dropdown option
 */
export const mk_option = (text, key, value) => ({ text, key, value: default_to(value, text) });

/**
 * @callback list_val_transform
 * Takes the current string value on iteration along with the original list
 * and returns a valid dropdown option for a react element.
 *
 * @param {string[]} list - value list
 * @param {string} value - current string value
 * @return {object} - valid dropdown option
 */

/**
 * @callback object_val_transform
 * Takes the current key on iteration along with the original object
 * and returns a valid dropdown option for a react element.
 *
 * @param {object} object - original object
 * @param {string} key - current key
 * @return {object} - valid dropdown option
 */

export const default_list_transform = (val, index, list) => mk_option(val, index)

/**
 * @function
 * Takes a list of strings and an optional manual transform, and returns a valid
 * list of options for a dropdown react component.
 *
 * If no transform is included, the string values will be used for the text and value
 *
 * @param {string[]} list - list of values for the dropdown options
 * @param {list_val_transform} [fn] - optional transform from key to option obj.
 * @return {object[]} - valid dropdown options from the given list
 */
export const list_options = (list, fn) => {
  const cb = default_to(fn, default_list_transform);
  return list.map(cb)
}

/**
 * @function
 * Takes the current key on iteration along with the original object
 * and returns an option object with the associated value as the display text,
 * and the key for the submission text.
 *
 * @param {object} object - original object
 * @param {string} key - current key
 * @return {object} - valid dropdown option
 */
export const default_obj_transform = (key, object) => mk_option(object[key], key, key);

/**
 * @function
 * Takes an object and an optional manual transform, and returns a valid
 * list of options for a dropdown react component.
 *
 * If no transform is included, the object's vlauestring values will be used for the text and value
 * Takes a object and an optional manual transform
 *
 * @param {string[]} list - list of values for the dropdown options
 * @param {object_val_transform} [fn] - optional transform from key to option obj.
 * @return {object[]} - valid dropdown options from the given list
 */
export const obj_options = (obj, fn) => {
  const cb = default_to(fn, default_obj_transform);
  return Object.keys(obj).map(key => cb(key, obj));
}
