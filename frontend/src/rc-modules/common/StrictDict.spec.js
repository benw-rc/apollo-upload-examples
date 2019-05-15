import StrictDict from './StrictDict';

const value1 = 'valUE1',
      value2 = 'vALue2',
      key1 = 'Key1',
      key2 = 'keY2';

describe('StrictDict', () => {
  let dict = StrictDict({
    [ key1 ]: value1,
    [ key2 ]: value2,
  });
  it('provides key access like a normal dict object', () => {
    expect(dict[key1]).toEqual(value1);
  });
  it('allows key listing', () => {
    expect(Object.keys(dict)).toEqual([key1, key2]);
  });
  it('allows item listing', () => {
    expect(Object.values(dict)).toEqual([value1, value2]);
  });
  it('throws an error if called with invalid key', () => {
    const callBadKey = () => {
      return dict.fakeKey;
    };
    window.console.error = jest.fn();
    expect(callBadKey).toThrow();
  });
});
