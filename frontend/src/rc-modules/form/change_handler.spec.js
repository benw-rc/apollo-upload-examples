import change_handler from './change_handler';
import * as common from 'rc-modules/common';

jest.mock('rc-modules/common');

describe('rc-modules form utils - change_handler', () => {
  const component = {
    state: { a: 1, b: 2, c: 3 },
    setState: jest.fn(),
  };
  const path = 'p.a.t.h';
  const e = 'err';
  const data = { value: 'VALue' };
  const fake_val = 'FAKE';
  it('takes a component and returns a change_handler creator function', () => {
    expect(typeof change_handler(component)(path)).toEqual('function');
  });
  it('sets value based on default_to output', () => {
    const expected = {
      ...component.state,
      p: { a: { t: { h: fake_val } } },
    };
    common.default_to = jest.fn(() => fake_val);
    change_handler(component)(path)(e, data);
    const args = common.default_to.mock.calls[0];
    expect(args[0]).toEqual(data);
    expect(args[1]).toEqual(e);
    expect(args[2]()).toEqual(data.value);
    expect(component.setState).toHaveBeenCalledWith(expected);
  });
});
