import _ from 'lodash';

import PropTypes from 'prop-types';

// Reducers 
export const test_reducer = (reducer, initial_state, reducer_tests) => {
  it('loads initial state', () => {
    expect(reducer(undefined, {})).toEqual(initial_state);
  });
  reducer_tests.forEach(test => {
    it(`reacts to ${test.action.type} action type`, () => {
      const { action, args=[], state, expected } = test;
      const { type, fn } = action;
      const out = fn(...args);
      expect(reducer(state, { ...out, type })).toEqual(expected);
    });
  });
};
test_reducer.propTypes = ({
  reducer: PropTypes.func.isRequired,
  initial_state: PropTypes.func.isRequired,
  tests: PropTypes.shape({
    action: PropTypes.shape({
      type: PropTypes.string.isRequired,
      fn: PropTypes.func.isRequired,
    }),
    args: PropTypes.arrayOf(PropTypes.any),
    state: PropTypes.any,
    expected: PropTypes.object,
  }).isRequired,
});

const obj = { an: 'object' };
const initial = { a: 'state', and: 'stuff' };
export const tests = {
  obj_partial: (action, path, args, expected_merge) => {
    const state = { ...initial };
    const expected = { ...initial };
    _.set(state, path, obj);
    _.set(expected, path, { ...obj, ...expected_merge });
    return { action, args, state, expected };
  },
};

export default test_reducer;
