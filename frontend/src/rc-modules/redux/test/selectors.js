/* globals it, expect */

import PropTypes from 'prop-types';

export const list_data = ['a thing', 'another thing'];

// Tests simple_selectors.
export const test_selectors = (selectors, keys) => {
  keys.forEach(key => {
    const selector = selectors[key];
    it(`returns the ${key} from the passed state`, () => {
      expect(selector({ test: 'asdf', [key]: list_data })).toEqual(list_data);
    });
  });
};
test_selectors.propTypes = ({
  selector: PropTypes.func.isRequired,
  prop: PropTypes.string.isRequired
});

export default test_selectors;
