/** @module */

import React from 'react';
import classNames from 'classnames';
import { Divider as BaseDivider, Icon } from 'semantic-ui-react';

import Component from '../Component';
import './Divider.scss';

/**
 * Simple Horizontal Divider w/ a label and an icon (defaulting to "sun" icon)
 *
 * @param {string} [icon="sun"] - Specify the icon name
 * @param {JSX} children - label values (preferably just a string)
 * @param {string=} className - additional css class names.
 */
export class Divider extends Component {
  render() {
    const { className, children, icon = "sun" } = this.props;
    return (
      <BaseDivider
        horizontal
        className={classNames("argus-divider", className)}
      >
        { icon !== null && <Icon name={icon}/> }
        {children}
      </BaseDivider>
    );
  }
}

export default Divider;
