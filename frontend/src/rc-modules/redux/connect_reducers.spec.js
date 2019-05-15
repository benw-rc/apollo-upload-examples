import connect_reducers from './connect_reducers';

const module1initial_state = {a: 1, b: 2};
const module2initial_state = {a: 2, b: 3};
const modules = {
  module1: {
    actions: {
      load: {
        type: 'LOAD',
        fn: value => ({ value }),
      },
    },
    selectors: {
      value: (state) => state.value,
    },
    types: { a: 3 },
    reducer: (state=module1initial_state, action) => {
      switch(action.type) {
        case 'LOAD':
          return { val: action.value };
        default:
          return state;
      }
    },
  },
  module2: {
    actions: {
      load: {
        type: 'LOAD',
        fn: (value, otherVal) => ({ value, otherVal }),
      },
    },
    selectors: {
      value: (state) => state.value,
    },
    types: { a: 2 },
    reducer: (state=module2initial_state, action) => {
      switch(action.type) {
        case 'LOAD':
          return action.otherVal;
        case 'Global.UPDATE':
          return {};
        default:
          return state;
      }
    },
  },
}

describe("connect_reducers", () => {
  let { actions, selectors, reducer, types } = connect_reducers(modules);
  const testVal = 'testVALUE',
        testVal2 = 'TESTvalue';
  describe('actions', () => {
    it('creates namespaced action cretor with configured arguments', () => {
      expect(actions.module1.load(testVal)).toEqual({
        type: 'module1.LOAD',
        value: testVal,
      });
      expect(actions.module2.load(testVal, testVal2)).toEqual({
        type: 'module2.LOAD',
        value: testVal,
        otherVal: testVal2,
      });
    });
  });
  describe('reducers', () => {
    const state = { module1: {}, module2: { temp: true } };
    it("strips namespace from actions with type matching current namespace", () => {
      expect(reducer(state, { type: 'module1.LOAD', value: testVal })).toEqual({
        ...state,
        module1: { val: testVal },
      });
    });
    it("prepends Global to actions types without current namespace", () => {
      expect(reducer(state, { type: 'UPDATE'})).toEqual({
        ...state,
        module2: {},
      });
    });
  });
  describe('selectors', () => {
    const state = { module1: { value: testVal }, module2: { value: testVal2 } };
    it('only passes the namespaced path of state to the selector', () => {
      expect(selectors.module1.value(state)).toEqual(testVal);
      expect(selectors.module2.value(state)).toEqual(testVal2);
    });
  });
});
