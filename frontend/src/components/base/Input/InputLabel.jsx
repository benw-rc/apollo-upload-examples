import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label } from 'semantic-ui-react';

import { should_update } from 'rc-modules/react';

/**
 * Simple label for input fields.
 * 
 * Handles the possibility of being passed a label string or a fully
 * instantiated/customized Label element.
 *
 * @param {JSX|string} [label=''] - label string or element.
 */
export class InputLabel extends Component {
  shouldComponentUpdate(prevProps, prevState) {
    return should_update(this, prevProps, prevState);
  }
  render() {
    const { label } = this.props;
    if (label === '') {
      return null;
    }
    if (typeof label === 'string') {
      return <Label>{label}</Label>
    }
    return label;
  }
}
InputLabel.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}
InputLabel.defaultProps = {
  label: '',
}

export default InputLabel;
