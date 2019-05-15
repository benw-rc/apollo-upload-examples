import default_to from './default_to';

describe('rc-modules common utils - default_to', () => {
  const check = 'checK';
  const default_value = 'vlaue';
  const value = () => 'blargle-snarf';
  it('returns default_value if check value is undefined', () => {
    expect(default_to(undefined, default_value)).toEqual(default_value);
  });
  it('returns check if not undefined and no extra value passed', () => {
    expect(default_to(check, default_value)).toEqual(check);
  });
  it('returns the output of value fn if one is passed and checked in not undefined', () => {
    expect(default_to(check, default_value, value)).toEqual(value());
  });
});

