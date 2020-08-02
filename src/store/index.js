import thunk from 'redux-thunk';
import { createStore, combineReducers ,applyMiddleware, compose  } from 'redux';
import authReducer from '../store/reducer';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => { //  redux store is create here.
  const store = createStore(
    combineReducers({
      state: authReducer
    }),
   composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
