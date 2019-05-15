/** @module */

import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';

import Component from '../Component';
import './ContentColumn.scss';

/**
 * The ContentColumn component is specifically intended for main-panel content
 * intended to fill either the left or right side.
 *
 * Takes a single `label` property which it uses to display a header on the column.
 *
 * @param {string|JSX} label - header label
 */
export class ContentColumn extends Component {
  render() {
    const { label, children, } = this.props;
    return (
      <div className="argus-content-column">
        <Header as="h3" inverted>{label}</Header>
        <div style={{height:"100%"}}>
          <div className="argus-content-column-wrapper">
            { children }
          </div>
        </div>
      </div>
    );
  }
}

ContentColumn.propTypes = {
  label: PropTypes.string,
};

export default ContentColumn;
