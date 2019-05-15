/** @module */
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Accordion as BaseAccordion } from 'semantic-ui-react';

import './Accordion.scss';

/**
 * @callback select_cb
 * @param {Object} e - event object
 * @param {Object} - clicked title element data
 */

/**
 * Simple Accordion overlay that adds our theming
 * Accepts all options for the semantic-ui-react Accordion
 *
 * <https://react.semantic-ui.com/modules/accordion>
 *
 * @param {string=} className - additional css classes
 * @param {select_cb=} on_select - callback to called w/ -1 if the element
 *   is active, or the index of the selected title card otherwise.
*/
export const Accordion = ({ className, on_select, ...props }) =>
  <BaseAccordion
    className={classNames('argus-accordion', className)}
    styled
    onTitleClick={(e, { index, active }) => on_select( active ? -1 : index )}
    inverted
    {...props}
  />

Accordion.propTypes = {
  className: PropTypes.string,
  on_select: PropTypes.func,
}
Accordion.defaultProps = {
  on_select: () => ({}),
};

export default Accordion;
