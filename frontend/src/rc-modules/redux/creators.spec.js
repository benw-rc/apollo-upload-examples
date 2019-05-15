import { action, mk_reducer, simple_selectors } from './creators';

describe('Redux utiltites - creators', () => {
  describe('action', () => {
    it('creates an action creator in the format necessary for connect_reducers', () => {
      const type = 'TyPE';
      const param1 = 'P1';
      const param2 = 'p3';
      const out = action(type, ['param1', 'param2']);
      expect(out.type).toEqual(type);
      expect(out.fn(param1, param2)).toEqual({ param1, param2 });
    });
  });
  describe('mk_reducer', () => {
    const initial_state = { initial: 'state' };
    const new_state = { a: 'state' };
    const bad_action = { type: 'BAD ACTION' };
    const good_action = { type: 'Type', key: 'VALUE' };
    let reducer;
    beforeEach(() => {
      reducer = mk_reducer(initial_state, {
        [good_action.type]: (state, action) => ({ ...state, ...action }),
      });
    });
    it('returns current state if action type is not included in actions arg', () => {
      expect(reducer(new_state, bad_action)).toEqual(new_state);
    });
    it('defaults to initial state if none is passed', () => {
      expect(reducer(initial_state, bad_action)).toEqual(initial_state);
    });
    it('handles actions whose keys are included', () => {
      expect(reducer(new_state, good_action)).toEqual({ ...new_state, ...good_action });
    });
  });
  describe('simple_selectors', () => {
    const state = { a: 1, b: 2, c: 3 };
    test('given a list of strings, returns a dict w/ a simple selector per string', () => {
      const keys = ['a', 'b'];
      const selectors = simple_selectors(keys);
      expect(Object.keys(selectors)).toEqual(['root', ...keys]);
      expect(selectors.a(state)).toEqual(state.a);
      expect(selectors.b(state)).toEqual(state.b);
    });
    test('given a list of strings, returns a dict w/ a simple selector per string', () => {
      const selectors = simple_selectors(state);
      expect(Object.keys(selectors)).toEqual(['root', ...Object.keys(state)]);
      expect(selectors.a(state)).toEqual(state.a);
      expect(selectors.b(state)).toEqual(state.b);
      expect(selectors.c(state)).toEqual(state.c);
    });
  });
});
