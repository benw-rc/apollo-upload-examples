/** @module */

import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';
import classNames from 'classnames';

import Component from '../Component';
import { Button } from 'components';

import './ModalButton.scss';

/**
 * Configuration for a button within the modal window.
 *
 * @typedef {Object} button_config
 * @property {string} color - valid css color
 * @property {string|JSX} content - button content
 * @property {callback} onClick - click event handler
 * @property {boolean} disabled - is the button disabled
 * @property {boolean} [close=true] - does the button close the modal.
 */

/**
 * Generates a modal that is tied to a button component.
 *
 * @param {string|JSX} btn_text - contents of button component
 * @param {string|JSX} header_text - modal header text
 * @param {button_config[]} buttons - array of button definitions for action pane.
 * @param {callback} onClick - additional function to call on button click.
 * @param {string} size - modal size (semantic-ui-react/modules/modal)
 * @param {string} size - button size (semantic-ui-react/elements/button)
 * @param {callback} update_state - takes true/false and controls whether the modal is open.
 * @param {JSX} children - modal body content
 */
export class ModalButton extends Component {
  constructor(props) {
    super(props);
    this.state = { show_modal: false };
  }
  componentWillUnmount() {
    this.update_state = () => ({});
  }
  update_state = (state) => {
    this.setState({ show_modal: state });
    if (this.props.update_state !== undefined) {
      this.props.update_state(state);
    }
  }
  close = () => this.update_state(false)
  open = () => this.update_state(true)
  render() {
    const btnClick = () => {
      this.props.onClick();
      this.open();
    }
    const { btn_size, btn_text, btn_props } = this.props;
    return (
      <Modal
        className={classNames('argus-modal-btn', this.props.className)}
        trigger={<Button size={btn_size} onClick={btnClick} {...btn_props}>{btn_text}</Button>}
        open={this.state.show_modal}
        onClose={() => this.update_state(false)}
        size={this.props.size}
        closeIcon
      >
        <Modal.Header>
          {this.props.header_text}
        </Modal.Header>
        <Modal.Content>
          { this.props.children }
        </Modal.Content>
        <Modal.Actions>
          { this.props.buttons.map(({ color, content, onClick, close=true, disabled=false }, i) =>
            <Button
              key={i}
              color={color}
              inverted={false}
              disabled={disabled}
              onClick={() => {
                if (onClick !== undefined) {
                  //Give buttons the ability to control how/when they close the modal
                  onClick(this.close);
                }
                if (close) {
                  this.close()
                }
              }}
            >
              {content}
            </Button>
          )}
        
        </Modal.Actions>
      </Modal>
    );
  }
}
ModalButton.propTypes = {
  btn_text: PropTypes.node.isRequired,
  header_text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  buttons: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func,
  children: PropTypes.node,
  size: PropTypes.string,
  btn_size: PropTypes.string,
  // takes true/false and controls whether the modal is open.
  update_state: PropTypes.func,
};
ModalButton.defaultProps = {
  onClick: () => ({}),
};

export default ModalButton;
