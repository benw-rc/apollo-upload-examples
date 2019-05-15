import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Icon } from 'semantic-ui-react';

import Component from '../Component';
import SliderToggle from './SliderToggle';

/**
 * A single item within a MenuButton's dropdown.
 *
 * Displays a slide-toggle if a toggle_val is passed.
 *
 * @param icon { string } - string icon designator.
 * @param label { string } - item label
 * @param onClick { function } - click callback
 * @param on_toggle { function } - slide-toggle callback (optional)
 * @param toggle_val { boolean } - slide-toggle value (optional)
 */
export class MenuItem extends Component {
  toggle = () => {
    const { toggle_val, on_toggle } = this.props;
    if (toggle_val === undefined) {
      return toggle_val;
    }
    return <SliderToggle value={toggle_val} on_change={on_toggle} />;
  }
  render() {
    const {
      entry_index, icon, label, onClick,
    } = this.props;
    return (
      <Dropdown.Item
        key={"entry-"+entry_index}
        onClick={onClick}
      >
        <div>
          { this.toggle() }
          <Icon name={icon} />
          { label }
        </div>
      </Dropdown.Item>
    );
  }
}

MenuItem.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  on_toggle: PropTypes.func,
  toggle_val: PropTypes.bool,
};

export default MenuItem;
