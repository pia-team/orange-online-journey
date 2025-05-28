import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import dashboardReducer from './dashboardSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  dashboard: dashboardReducer,
});

export default rootReducer;
