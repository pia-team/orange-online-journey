import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import dashboardReducer from './dashboardSlice';
import quotesReducer from './features/quotes/quotesSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  dashboard: dashboardReducer,
  quotes: quotesReducer,
});

export default rootReducer;
