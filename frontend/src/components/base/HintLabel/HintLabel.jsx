/** @module */

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Popup, Icon } from 'semantic-ui-react';

import './HintLabel.scss';
import Component from '../Component';

/**
 * Simple label with added "question mark w/ popup hint" element
 *
 * @param {string} className - optional css class
 * @param {string} hint - hint to display
 * @param {string} label - label content
 * @param value - current value
 */
export class HintLabel extends Component {
  render() {
    const { className, label, value, hint } = this.props;
    return (
      <div className={classNames(className, 'hint-label')}>
        <span className="hint-label-label">{label}</span>
        <div className="hint-label-hint">
          <Popup
            trigger={<Icon name="question circle" inverted/>}
            content={hint}
            position="right center"/>
        </div>
        <br />
        <span className="hint-label-value">{value}</span>
      </div>
    );
  }
}
HintLabel.propTypes = {
  className: PropTypes.string,
  hint: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
};
HintLabel.defaultProps = {
  value: '',
  label: '',
  hint: '',
  className: '',
};

export default HintLabel;
