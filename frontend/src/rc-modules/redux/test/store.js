/* globals it, expect */

import PropTypes from 'prop-types';

import _ from 'lodash';

export const listData = ['a thing', 'another thing'];

// Action Tests
export const testActions = (actions, fnKeys) => {
  test('all action types are unique', () => {
    const types = Object.keys(actions).map(action => actions[action].type);
    expect(_.uniq(types)).toEqual(types);
    expect(_.every(types, (type) => typeof type === 'string')).toEqual(true);
  });
  Object.keys(fnKeys).forEach(actionKey => {
    describe(actionKey, () => {
      it('forwards the correct arguments to the action', () => {
        const fn = actions[actionKey].fn,
              props = fnKeys[actionKey];
        const expected = props.reduce((obj, prop) => ({ ...obj, [prop]: prop }), {})
        expect(fn(...props)).toEqual(expected);
      });
    });
  });
};

// Reducers 
export const testReducer = (reducer, initial_state, tests) => {
  it('loads initial state', () => {
    expect(reducer(undefined, {})).toEqual(initial_state);
  });
  tests.forEach(test => {
    it(`reacts to ${test.action.type} action type`, () => {
      const { action, args, state, expected } = test;
      const { type, fn } = action;
      expect(reducer(state, { ...fn(...args), type })).toEqual(expected);
    });
  });
};
testReducer.propTypes = ({
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

// Selector Tests
export const testSelector = (selector, prop) => {
  it(`returns the ${prop} from the passed state`, () => {
    expect(selector({ test: 'asdf', [prop]: listData })).toEqual(listData);
  });
};
testSelector.propTypes = ({
  selector: PropTypes.func.isRequired,
  prop: PropTypes.string.isRequired
});
