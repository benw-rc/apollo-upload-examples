/** @module */
import _ from 'lodash';

import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'semantic-ui-react';

import Component from '../Component';
import './HintControl.scss';

/**
 * Wraps any control, to make it display a hint when hovered over.
 *
 * label_props takes all options accepted by semantic-ui-react label.
 * <https://react.semantic-ui.com/elements/label>
 *
 * @param {string} hint - hint to display
 * @param {Object} label_props - additional label options.
 */
export class HintControl extends Component {
  render() {
    const { children, hint, label_props, is_g } = this.props;
    const label = (
      <Label
        pointing="below"
        { ...(!_.isEmpty(label_props) && label_props) }
      >
        {hint}
      </Label>
    );
    return is_g
      ? <g className='argus-hint-control'>
          { label }
          { children }
        </g>
      : <div className='argus-hint-control'>
          { label }
          { children }
        </div>
  };
}

HintControl.propTypes = {
  hint: PropTypes.node,
  label_props: PropTypes.object,
};

HintControl.defaultProps = {
  label_props: {},
}

export default HintControl;
