/** @module */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Divider, Dropdown } from 'semantic-ui-react';

import Component from '../Component';
import MenuItem from './MenuItem';

import './MenuButton.scss';

/**
 * @typedef {Object} menu_item_opts
 * @property {string} icon - icon to display on the menu item
 * @property {string} label - label to display on the menu item
 * @property {callback} onClick - click event for the menu item
 * @property {boolean} [toggle_val] - adds toggle w/ this val to menu item
 * @property {callback} [on_toggle] - handle toggle on this item
 */

/**
 * MenuButton provides a dropdown in the guise of a button, with menu themed
 * configuration options.
 *
 * A menu item can either have an onClick behavior or an on_toggle behavior.
 * To give the item an on_toggle behavior, simply assign it a toggle_val.
 *
 * @param {string} [icon] - icon to display in button
 * @param {string} label - text to display on button
 * @param {string} [className] - additional css class
 * @param {menu_item_opts} contents - configuration for menu options.
 */
export class MenuButton extends Component {
  render() {
    const { className, icon, label, contents } = this.props;
    return (
      <Dropdown
        className={classNames(className, "icon", "argus-menu-btn")}
        text={label}
        icon={icon}
        floating
        labeled
        button
        basic
        pointing='top left'
      >
        <Dropdown.Menu>
          { contents.map((group, group_index) =>
            <div key={"group-"+group_index}>
              { group.map(({ icon, label, onClick, on_toggle, toggle_val }, entry_index) =>
                  <MenuItem
                    entry_index={entry_index} 
                    key={entry_index}
                    {...{ icon, label, onClick, on_toggle, toggle_val }}
                  />
              )}
              { group_index !== contents.length - 1  && <Divider /> }

            </div>
          )}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}


MenuButton.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  contents: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string,
        label: PropTypes.string,
        onClick: PropTypes.func,
        on_toggle: PropTypes.func,
        toggle_val: PropTypes.bool,
      }),
    )
  ),
};

export default MenuButton;
