import _ from 'lodash';

import { render, simple_test } from 'rc-modules/redux/test/components';
import { Accordion } from './Accordion';

describe('Accordion component', () => {
  const props = { some: 'props', for_the: 'tests' };
  const className = 'cln';
  simple_test(
    'basic',
    Accordion,
    {
      className,
      on_select: jest.fn(),
      ...props,
    }
  );
  describe('prop tests', () => {
    let el, sub_el, el_props, on_select;

    beforeEach(() => {
      on_select = jest.fn();
      el = render(Accordion, {
        className,
        on_select,
        ...props,
      });
      sub_el = el.find('Accordion');
      el_props = sub_el.props();
    });

    it('forwards props', () => {
      expect(el_props.className.split(' ')).toContain(className);
      _.mapValues(props, (val) => expect(el_props[val]).toEqual(props[val]));
    });

    it('calls on_select on title click (index if inactive, -1 if active)', () => {
      const index = 2;
      el_props.onTitleClick('err', { index, active: true });
      expect(on_select).toHaveBeenCalledWith(-1);
      el_props.onTitleClick('err', { index, active: false });
      expect(on_select).toHaveBeenCalledWith(index);
    });
  });

});
