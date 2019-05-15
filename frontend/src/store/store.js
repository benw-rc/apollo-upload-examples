import { connect_reducers } from 'rc-modules/redux';

import * as app from './app';
import * as api from 'modules/api/store';


const {
  thunk_actions, actions, action_types, global_action_types, reducer, selectors, types 
} = connect_reducers({
  app,
  api,
});

export {
  actions,
  action_types,
  global_action_types,
  reducer,
  selectors,
  thunk_actions,
  types
};
