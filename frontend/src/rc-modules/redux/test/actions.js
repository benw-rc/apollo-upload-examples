/* globals it, expect */

import _ from 'lodash';

// Action Tests
export const test_actions = (actions, fn_keys) => {
  test('all action types are unique', () => {
    const types = Object.keys(actions).map(action => actions[action].type);
    expect(_.uniq(types)).toEqual(types);
    expect(_.every(types, (type) => typeof type === 'string')).toEqual(true);
  });
  Object.keys(fn_keys).forEach(action_key => {
    describe(action_key, () => {
      it('forwards the correct arguments to the action', () => {
        const fn = actions[action_key].fn,
              props = fn_keys[action_key];
        const expected = props.reduce((obj, prop) => ({ ...obj, [prop]: prop }), {})
        expect(fn(...props)).toEqual(expected);
      });
    });
  });
};

export default test_actions;
