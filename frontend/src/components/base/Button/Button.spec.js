import React from 'react';
import { render, simple_test } from 'rc-modules/redux/test/components';

import { RCButton as Button } from './Button';

jest.mock('semantic-ui-react');

describe('Button component', () => {
  let el, sub_el, el_props;
  const props = { some: 'component', props: 'for testing' };
  const className = 'cl_n';
  const icon = 'Icon';
  const children = <div>Some Stuff</div>

  simple_test('basic', Button, { className, icon, ...props })
  simple_test('with_children', Button, { className, icon, children, ...props })

  describe('className', () => {
    it('uses passed className alongside argus-btn className', () => {
      el = render(Button, { className });
      expect(el.hasClass('argus-btn')).toEqual(true);
      expect(el.hasClass(className)).toEqual(true);
    });
    it('includes active className iff that props is included', () => {
      el = render(Button, { className });
      expect(el.hasClass('active')).toEqual(false);
      el = render(Button, { className, active: true });
      expect(el.hasClass('active')).toEqual(true);
    });
  });

  describe('icon and children', () => {
    it('passes icon as a prop if no children are passed', () => {
      el = render(Button, { className, icon });
      expect(el.prop('icon')).toEqual(icon);
      expect(el.children().exists()).toEqual(false)
    });
    it('passes icon as a child if other children are passed', () => {
      el = render(Button, { className, icon, children });
      expect(el.prop('icon')).toEqual(undefined);
      expect(el.children().contains(children));
      const icon_el = el.children().find('Icon');
      expect(icon_el.exists()).toEqual(true);
      expect(icon_el.prop('name')).toEqual(icon);
    });
  });
});
