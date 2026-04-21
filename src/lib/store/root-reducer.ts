import { combineReducers } from 'redux';
import exampleSlice from './slices/example-slices';

const rootReducer = combineReducers({
  [exampleSlice.name]: exampleSlice.reducer,
});

export default rootReducer;
