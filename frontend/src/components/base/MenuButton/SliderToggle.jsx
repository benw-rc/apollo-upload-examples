import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { should_update } from 'rc-modules/react';
import './SliderToggle.scss';

/**
 * A slider toggle for a given menu-item.
 * 
 * @param on_change { function } - toggle callback
 * @param value { boolean } - current value
 */
export class SliderToggle extends Component {
  constructor(props) {
    super(props);
    this.state = {value: props.value};
  }
  shouldComponentUpdate(prevProps) {
    return should_update(this, prevProps);
  }
  handle_click = (e) => {
    e.stopPropagation();
    this.setState({ value: !this.state.value });
    this.props.on_change(this.state.value);
  }
  render() {
    return (
      <div
        className={classNames("argus-slider-toggle", { right: this.state.value })}
        onClick={this.handle_click}
      >
        <div className="track"/>
        <div className="handle"/>
      </div>
    );
  }
}

SliderToggle.propTypes = {
  on_change: PropTypes.func,
  value: PropTypes.bool,
};
SliderToggle.defaultProps = {
  on_change: console.log,
}

export default SliderToggle;
