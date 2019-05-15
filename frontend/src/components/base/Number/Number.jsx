/** @module */

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Component from '../Component';
import { Button, Input } from 'components';

import './Number.scss';

/**
 * @callback set_cb
 * @param {number} val - new value
 */

/**
 * Number component wraps Input component, but is targeted for number usage.
 * has a "set" button for its right label, and its left_label is assigned simply as
 * 'label'.
 *
 * Takes all options accepted by Input component
 *
 * @param {string} label - left label
 * @param {set_cb} set - function to be called w/ new value when set button is clicked.
 */
export class Number extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.handle_change(this.props.value);
    }
  }
  handle_change = (value) => this.setState({ value })
  render() {
    const { value } = this.state;
    const {
      label,
      set,
      className,
      ...props
    } = this.props;
    return (
      <div className={classNames(className, 'number-control')}>
        <Input
          left_label={label}
          right_label={
            <div>
              <Button onClick={() => set(this.state.value)}> Set </Button> 
            </div>
          }
          type="number"
          onChange={this.handle_change}
          value={value}
          { ...props }
        />
      </div>
    );
  }
}
Number.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  set: PropTypes.func.isRequired,
}
Number.defaultProps = {
  min: 0,
  max: 100,
}

export default Number;
