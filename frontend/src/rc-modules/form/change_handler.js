/** @module */
import _ from 'lodash';

import { default_to } from 'rc-modules/common';

/**
 * @callback change_handler_creator
 * @param {string} path - path to be set in the state with the new value.
 * @return {change_handler} - change_handler
 */

/**
 * @callback change_handler
 * @param {Object} e - event object
 * @param {Object} [data] - secondary data object passed w/ some events
 */

/**
 * Form change handler
 * Takes a component to instantiate into.
 * Returns a handler-creator, which takes a path and returns an event
 * handler which can respond to a number of different types of input events.
 *
 * The returned change_handler will put the appropriate value at the passed path
 * in the component's state;
 *
 * @function
 * @param {Component} component - parent form component
 * @return {change_handler_creator} - change_handler creator
 */
export const change_handler = (component) => (
  (path) => (e, data) => {
    const state = { ...component.state };
    const val = default_to(data, e, () => data.value);
    _.set(state, path, val);
    component.setState(state);
  }
);

export default change_handler;
