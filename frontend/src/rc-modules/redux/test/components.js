/* globals it, expect */

import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import * as _ from 'lodash';

// Components
export const render = (Component, props) => {
  return shallow(<Component {...props} />);
};
render.propTypes = ({
  Component: PropTypes.element.isRequired,
  props: PropTypes.objectOf(PropTypes.node).isRequired
});

export const snapshot_test = tree => {
  expect(toJson(tree)).toMatchSnapshot();
};

export const simple_test = (name, Component, props) => {
  test('snapshot' + name ? `:${name}` : '' , () => {
    snapshot_test(render(Component, props));
  });
}
simple_test.propTypes = ({
  name: PropTypes.string.isRequired,
  Component: PropTypes.node.isRequired,
  props: PropTypes.object,
});

// mapStateToProps
export const mock_selectors = (selectors, to_mock) => {
  Object.keys(to_mock).map(key => {
    _.set(selectors, to_mock[key], jest.fn((...props) => ({ ...props, key })));
  });
}
mock_selectors.propTypes = ({
  selectors: PropTypes.object.isRequired,
  to_mock: PropTypes.objectOf(PropTypes.string),
});

export const test_selector = (selectorProp, args, key) => {
  expect(selectorProp).toEqual({ ...args, key });
};
export const test_selectors = (mapStateToProps, ownProps, mapping) => {
  const state = 'stATe';
  const props = mapStateToProps(state, ownProps);
  Object.keys(mapping).forEach(prop => {
    test_selector(props[prop], [state, ...mapping[prop]], prop);
  });
}

export const test_state_to_props = (mapStateToProps, selectors, expected) => {
  mock_selectors(selectors, expected);
  const state = { field: 'FieLD' };
  const props = mapStateToProps(state);
  Object.keys(expected).map(key => {
    test_selector(props[key], [state], key);
  });
};
test_state_to_props.propTypes = ({
  mapStateToProps: PropTypes.func.isRequired,
  selectors: PropTypes.object.isRequired,
  expected: PropTypes.object.isRequired,
});

// mapDispatchToProps
export const mock_actions = (actions, to_mock) => {
  to_mock.map(action_path => _.set(actions, action_path, (...props) => [...props]));
}
mock_actions.propTypes = {
  actions: PropTypes.object,
  to_mock: PropTypes.arrayOf(PropTypes.string),
};

