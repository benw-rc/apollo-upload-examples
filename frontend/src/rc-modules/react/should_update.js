/** @module */

import _ from 'lodash';

/**
 * Provides a smart-checker for determining if a React component should
 * update based on its new props and state.
 *
 * This is mostly necessary because React is having problems with complex
 * props.
 * 
 * This method compares all non-function props in a dict-comparison-safe
 * check, and should return much more reliable (and less frequent) renders.
 *
 * Usage:
 * ```
 *   // props only
 *   shouldComponentUpdate(prevProps) {
 *     return should_update(this, prevProps);
 *   }
 *   // stateful
 *   shouldComponentUpdate(prevProps, prevState) {
 *     return should_update(this, prevProps, prevState);
 *   }
 * ```
 *
 * @function
 * @param {ReactElement} el - element considering updating
 * @param {Object} prevProps - previous props object
 * @param {Object} [prevState] - previous state object
 * @return {boolean} - should the component update?
 */
export const should_update = (el, prevProps, prevState) => {
  const filter = (coll) => _.filter(coll, val => typeof val !== 'function');
  return !_.isEqual(
    [prevState, filter(prevProps)],
    [el.state, filter(el.props)]
  );
};

export default should_update;
