import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Component } from 'components';
import FileUpload from 'components/FileUpload';

import "./App.scss";
import "scss/theme.scss";

import moment from 'moment';

window.moment = moment;

class App extends Component {
  componentDidMount() {
  }
  componentDidUpdate(prevProps, prevState) {
  }
  render() {
    return (
      <div className="wrapper">
        <div id="main-panel" className="main-panel">
          <div id='app-content'>
            <FileUpload />
          </div>
        </div>
      </div>
    );
  }
}
App.propTypes = {
  page: PropTypes.string,
}

export const mapStateToProps = state => ({
});

export const mapDispatchToProps = (dispatch) => ({
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppContainer;
