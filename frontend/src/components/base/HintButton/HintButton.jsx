/** @module */

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

import Component from '../Component';
import Button from '../Button';
import HintControl from '../HintControl';

import './HintButton.scss';

/**
 * Simple Button w/ a text hint and optional icon.
 *
 * Takes all options accepted by semantic-ui-react button.
 * <https://react.semantic-ui.com/elements/button>
 *
 * label_props takes all options accepted by semantic-ui-react label.
 * <https://react.semantic-ui.com/elements/label>
 *
 * @param {string} className - optional additional css class
 * @param {string} hint - hint to display
 * @param {Object} label_props - additional label options.
 * @param {string} icon - optional icon key
 */
export class HintButton extends Component {
  render() {
    const {
      children,
      className,
      hint,
      icon,
      label_props,
      ...props
    } = this.props;
    const button = (
      (children === undefined)
        ? <Button
            className={classNames(className, "argus-hint-btn")}
            icon={icon}
            {...props}
          />
        : <Button
            className={classNames(className, "argus-hint-btn", "has-text")}
            {...props }
          >
            {icon !== undefined && <Icon name={icon}/>}
            {children}
          </Button>
    );
    return (
      <HintControl {...{ hint, label_props }}>{button}</HintControl>
    );
  };
}

HintButton.propTypes = {
  className: PropTypes.string,
  hint: PropTypes.node,
  icon: PropTypes.string,
  label_props: PropTypes.object,
};

HintButton.defaultProps = {
  size: 'tiny',
}

export default HintButton;
