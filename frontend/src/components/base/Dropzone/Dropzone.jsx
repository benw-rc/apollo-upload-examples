/** @module */
import React from 'react';
import PropTypes from 'prop-types';
import { Label, Segment } from 'semantic-ui-react';

import DropzoneBase from 'react-dropzone';

import { Button } from 'components';
import Component from '../Component';

import './Dropzone.scss';

/**
 * Extension of the react-dropzone component.
 *
 * Accepts a list of accepted filetypes, a label, and an on_drop callback.
 *
 * Provides a Clear Files option when a file has been uploaded.
 */
export class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }

  /**
   * @method
   * Handle dropped files, by updating current state and calling passed
   * on_drop method.
   * @param {object[]} files - array of files passed by dropzone event.
   */
  on_drop = (files) => {
    this.setState({ files });
    this.props.on_drop(files);
  }

  /**
   * @method
   * Simple string formatter for loaded file objects.
   * @param {object} file - file object data
   * @return {string} - formatted file display string.
   */
  display_file = (file) => `${file.path} - ${file.size} bytes`;

  /**
   * @method
   * Event handler that clears current loaded files.
   */
  clear_files = (e) => {
    e.stopPropagation();
    this.on_drop({ files: [] });
  };

  render() {
    const { accepted_types, label, on_drop } = this.props;

    const has_file = this.state.files.length > 0;

    const clear_btn_options = {
      color: "red",
      icon: "trash",
      onClick: this.clear_files,
      inverted: false,
    };

    return (
      <DropzoneBase onDrop={this.on_drop} accept={accepted_types.join(', ')}>
        {({ getRootProps, getInputProps }) => (
          <Segment inverted className="dropzone-component">
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
              <Label attached="top">{label}</Label>
              Drag your file here or click to select files.
              <br />
              <em>(Only files of type {`${accepted_types.join(', ')}`} will be accepted)</em>
              { has_file && 
                <div className="file-display">
                  Files: {this.display_file(this.state.files[0])}
                  <Button {...clear_btn_options} />
                </div>
              }
            </div>
          </Segment>
        )}
      </DropzoneBase>
    );
  }
}

Dropzone.propTypes = {
  accepted_types: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string,
  on_drop: PropTypes.func,
};

export default Dropzone;
