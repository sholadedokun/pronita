import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import restaurantsReducer from './restaurantsReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  form,
  allRestaurants: restaurantsReducer,
  user:userReducer,
});

export default rootReducer;
