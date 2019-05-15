/** @module */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Checkbox as BaseCheckbox} from 'semantic-ui-react';

import Component from '../Component';
import './Checkbox.scss';

/**
 * @callback change_cb
 * @param {boolean} new_val - new toggle value
 */

/**
 * Checkbox overlay that simplifies the onChange behavior and imposes some of our
 * styling, as well as adding a vertical option
 *
 * Accepts all options accepted by semantic-ui-react 
 * <https://react.semantic-ui.com/modules/checkbox>
 *
 * @param {change_cb} onChange - function called with the new value on toggle
 * @param {string} label - data label
 * @param {boolean} checked - is the box checked?
 * @param {boolean} [vertical=false] - is the label below the box?
 */
export class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked,
    };
  }
  toggle = (e, d) => {
    this.setState({ checked: d.checked });
    this.props.onChange(d.checked);
  }
  render() {
    const { label, vertical, className, onChange, ...props } = this.props;
    const { checked } = this.state;
    const checkbox = (
      <BaseCheckbox
        checked={checked}
        onChange={this.toggle}
        {...(!vertical && { label })}
        {...props} 
      />
    );

    return (
      <div className={classNames("argus-checkbox", className, { vertical })}>
        { checkbox }
        { vertical && <br /> }
        { vertical && label}
      </div>
    );
  }
}

Checkbox.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.string,
  checked: PropTypes.bool,
  vertical: PropTypes.bool,
};
Checkbox.defaultProps = {
  checked: false,
  onChange: () => ({}),
}

export default Checkbox;
