import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import userReducer from './userReducer';
import inventoryReducer from './inventoryReducer';

const rootReducer = combineReducers({
  form,
  inventory: inventoryReducer,
  user:userReducer,
});
export default rootReducer;
