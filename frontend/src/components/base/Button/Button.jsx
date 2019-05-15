/** @module */
import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Component from '../Component';

import './Button.scss';

/**
 * Basic Button implementation.  Adds our styling options to the basic
 * semantic-ui-react Button.
 *
 * Accepts all options for the semantic-ui-button:
 * <https://react.semantic-ui.com/elements/button>
 *
 * @param {boolean} [active]  - is the button active? (adds css class)
 * @param {string} [className] - additional css class names
 * @param {string} [icon] - icon name
 * @param {boolean} [inverted=false]- (optional [ default: false ])
 */
export class RCButton extends Component {
  render() {
    const { className, children, active, icon, ...props } = this.props;
    const btn_props = {
      inverted: true,
      size: 'mini',
      className: classNames(className, 'argus-btn', { active }),
      ...props,
    };
    if (children === undefined) {
      return <Button icon={icon} { ...btn_props } />
    }
    return (
      <Button { ...btn_props } >
        { icon !== undefined && <Icon name={icon} /> }
        { children }
      </Button>
    );
  }
}
RCButton.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool,
  icon: PropTypes.string,
}

export default RCButton;
