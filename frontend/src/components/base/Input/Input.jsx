/** @module */

import React from 'react';
import PropTypes from 'prop-types';
import { Input as BaseInput } from 'semantic-ui-react';
import classNames from 'classnames';

import Component from '../Component';
import { default_to } from 'rc-modules/common';
import InputLabel from './InputLabel';

import './Input.scss';

/**
 * @callback change_cb
 * @param {string|Number} new_val - new input value
 */

/**
 * Input component wraps semantic-ui-react Input, providing labels,
 * theming, some data validation, and a simplified onChange pipeline.
 *
 * Enforces min/max if provided, as well as enforcing integer values if the
 * integer flag is passed.
 *
 * @param {string} [type="text"] - "number" or "text"
 * @param {string|Number} [value=""] - current input value
 * @param {change_cb} onChange - called with output value
 * @param {string} [left_label] - label to show to left of input
 * @param {string} [right_label] - label to show to right of input
 * @param {boolean} [integer=false] - enforce integer values.
 * @param {boolean} [readonly=false] - read-only input
 * @param {boolean} [fluid=false] - passed to semantic ui component
 */
export class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value) {
      this.setState({ value: this.props.value });
    }
  }
  handle_change = (e, data) => {
    const { integer, min, max, type } = this.props;
    if (type === 'file') {
      return { file: e.target.files[0], filename: data.value.split("fakepath\\")[1] };
    }
    let value = data.value;
    if (integer) {
      if (value === '' || value === '-') {
        return this.setState({ value });
      }
      else {
        value = parseInt(value);
        if (value.toString() === 'NaN') {
          return;
        }
      }
    }
    value = default_to(min, value, () => Math.max(min, value));
    value = default_to(max, value, () => Math.min(max, value));
    this.setState({ value });
    if (this.props.onChange !== undefined) {
      this.props.onChange(value);
    }
  }
  render() {
    const {
      left_label,
      right_label,
      readonly,
      fluid,
      onChange,
      className,
      light,
      integer,
      ...input_props
    } = this.props;
    const labels = {
      ...(left_label !== undefined && { left: left_label }),
      ...(right_label !== undefined && { right: right_label }),
    };
    const num_labels = Object.keys(labels).length;
    let params = {
      ...input_props,
      className: classNames(
        'argus-input',
        className,
        { dark: !light }),
      placeholder: '---',
      value: this.state.value,
      onChange: this.handle_change.bind(this),
    };
    if (num_labels > 0) {
      params = { ...params, labelPosition: 'right' };
      return (
        <BaseInput { ...params } disabled={readonly} fluid={fluid}>
          <InputLabel label={left_label} />
          <input />
          <InputLabel label={right_label} />
        </BaseInput>
      );
    }
    return <BaseInput { ...params } disabled={readonly} fluid={fluid}/>;
  }
}
Input.propTypes = {
  type: PropTypes.oneOf(['text', 'number', 'file']),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
  left_label: PropTypes.node,
  right_label: PropTypes.node,
  integer: PropTypes.bool,
  readonly: PropTypes.bool,
  fluid: PropTypes.bool,
}
Input.defaultProps = {
  value: '',
  type: 'text',
  onChange: () => ({}),
};

export default Input;
