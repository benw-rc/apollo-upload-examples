import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import thunk from 'redux-thunk';

import reducer from 'store';

import App from 'containers/App/App';

import 'typeface-roboto';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-slider/dist/css/bootstrap-slider.min.css';
import 'semantic-ui-css/semantic.min.css'
import 'animate.css/animate.min.css';

import * as Sentry from '@sentry/browser';

// import 'why-did-you-update-redux';
// import { whyDidYouUpdate } from 'why-did-you-update';
// whyDidYouUpdate(React);

if (process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    beforeSend(event) {
      // Check if it is an exception, if so, show the report dialog
      if (event.exception) {
        Sentry.showReportDialog({ eventId: event.event_id });
      }
      return event;
    },
  });
}

let stateTransformer = (state) => {
  return {
    ...state,
  }
}

let predicate = (getState, action) => {
  let blackList = [
  ]
  if (blackList.indexOf(action.type) > -1) {
    return false;
  }
  return true;
}

const logger = createLogger({
  stateTransformer,
  predicate,
  collapsed: (getState, action, logEntry) => !logEntry.error,
});

const apollo_client = new ApolloClient({
  link: createUploadLink({ uri: process.env.REACT_APP_APOLLO_URI }),
  cache: new InMemoryCache(),
});

const globals = {
  apollo: apollo_client,
}

const store = createStore(
  reducer,
  compose(applyMiddleware(
    thunk.withExtraArgument(globals),
    logger
  )));

window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <div className="wrapper">
      <HashRouter>
        <Switch>
          <Route path="/" render={() => <App />} />
        </Switch>
      </HashRouter>
    </div>
  </Provider>,
  document.getElementById('root')
);
