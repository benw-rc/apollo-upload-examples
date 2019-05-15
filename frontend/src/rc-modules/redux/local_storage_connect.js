/** @module */

import _ from 'lodash';

import { default_to } from 'rc-modules/common';

/**
 * Returns the JSON-parsed value of stored in localStorage at the given key,
 * defaulting to default_val if nothing is stored there.
 *
 * @function
 * @param {string} key - localStorage key to query
 * @param default_val - default value to return
 * @return - JSON-Parsed output of the store value.
 */
export const local_storage_value = (key, default_val) => {
  const ls_val = localStorage.getItem(key);
  return default_to(ls_val, default_val, () => JSON.parse(ls_val));
}

/**
 * Save an object to localStorage, with a shared prefix for all keys.
 * Each value is JSON.stringify-ed for storage.
 *
 * @function
 * @param {Object} state - state object to add to localStorage
 * @param {string} ns - namespace string to prepend to each key in <state>.
 */
export const save = (state, ns) => {
  Object.keys(state).forEach(key => {
    localStorage.setItem(ns + '.' + key, JSON.stringify(state[key]));
  });
}

/**
 * Factory for a connect_reducers mapping that applies changes
 * to localStorage.
 *
 * @function
 * @param {Object} mapping - store module mapping.
 * @return {Object} - store module mapping, with reducers updated to
 *   apply changes to localStorage.
 */
export const local_storage_connect = (mapping) => _.mapValues(mapping, (module, ns) => {
  // any non-truthy value is ignorable here, including 0 and empty strings.
  const initial_state = _.mapValues(
    module.initial_state,
    (val, key) => local_storage_value(ns + '.' + key, val)
  );
  const reducer = (state=initial_state, action) => {
    let new_state = module.reducer(state, action);
    if (JSON.stringify(state) !== JSON.stringify(new_state)) {
      save(new_state, ns);
    }
    return new_state;
  }
  return { ...module, initial_state, reducer };
});

export default local_storage_connect;
