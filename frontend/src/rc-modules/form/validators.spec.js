import * as validators from './validators';

describe('rc-modules form utils - validators', () => {
  const val = 'VAl';
  const label = 'LABEl';
  const test_error = (validator, v, message) => {
    expect(validator(v, label)).toEqual({ error: true, message });
  }
  const test_success = (validator, v) => {
    expect(validator(v, label)).toEqual({ error: false });
  }
  describe('empty', () => {
    const { empty } = validators;
    const message = validators.empty_message(label);
    it('returns success for non-empty strings', () => {
      test_success(empty, val);
    });
    it('returns an error if value is undefined', () => {
      test_error(empty, undefined, message);
    });
    it('returns an error if value is an empty string', () => {
      test_error(empty, '', message);
    });
  });
  describe('name_chars', () => {
    const { name_chars } = validators;
    const message = validators.name_chars_message(label);
    it('returns success for a valid string', () => {
      test_success(name_chars, 'a_valid_string');
    });
    it('returns an error if value has special characters other than _', () => {
      test_error(name_chars, 'a space', message);
      test_error(name_chars, 'a.period', message);
      test_error(name_chars, 'a-dash', message);
      test_error(name_chars, 'a#hash', message);
    });
  });

  describe('reduce_errors', () => {
    it('returns success if none of the messages passed are an error', () => {
      const errors = [{ error: false }, { error: false }, { error: false }];
      expect(validators.reduce_errors(errors)).toEqual({ error: false });
    });
    it('returns compiled error messages of all errors.', () => {
      const str1 = 'dangerous';
      const str2 = 'to';
      const str3 = 'go';
      const str4 = 'alone';
      const errors = [
        { error: false },
        { error: true, message: str1 },
        { error: false },
        { error: true, message: str2 },
        { error: false },
        { error: true, messages: [str3, str4] },
      ];
      expect(validators.reduce_errors(errors)).toEqual({
        error: true,
        messages: [str1, str2, str3, str4],
      });
    });
  });

  describe('name', () => {
    it('returns reduce_errors output for both empty and name_chars validators', () => {
      const expected = "EXPECTed!";
      const empty = 'empty';
      const name_chars = 'name_chars';
      validators.reduce_errors = jest.fn(() => expected);
      validators.empty = jest.fn(() => empty);
      validators.name_chars = jest.fn(() => name_chars);
      expect(validators.name(val, label)).toEqual(expected);
      expect(validators.reduce_errors).toHaveBeenCalledWith([empty, name_chars]);
      expect(validators.empty).toHaveBeenCalledWith(val, label);
      expect(validators.name_chars).toHaveBeenCalledWith(val, label);
    });
  });
});

