import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Dropzone } from 'components';
import { thunk_actions } from 'store';

import './FileUpload.scss';

export class FileUpload extends Component {
  state = {
    file: null
  }

  handle_drop = (val) => this.setState({ file: val[0] });

  upload = () => {
    console.log(this.state);
    this.props.upload(this.state.file);
  }

  render() {
    return (
      <div className="file-upload">
        <Dropzone accepted_types={['.csv', '.png']} on_drop={this.handle_drop} label="File" />
        <Button onClick={this.upload}>Upload</Button>
      </div>
    );
  }
}

FileUpload.propTypes = {
};

export const mapDispatchToProps = (dispatch) => ({
  upload: (file) => dispatch(thunk_actions.api.upload_file(file)),
});

export default connect(() => ({}), mapDispatchToProps)(FileUpload);
