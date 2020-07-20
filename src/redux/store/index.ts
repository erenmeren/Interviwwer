import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk-recursion-detect';
import { authReducer } from '../auth/reducers';
import { userReducer } from '../user/reducers';
import { IState } from '../../interfaces';

const reduces = combineReducers({
  userAuthData: authReducer,
  users: userReducer,
});

let composeEnhancers;

if (
  process.env.NODE_ENV !== 'production' &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) {
  composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
} else {
  composeEnhancers = compose;
}

export const store = createStore<IState, any, any, any>(
  reduces,
  undefined,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);
