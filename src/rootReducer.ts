import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import dashboardReducer from './dashboardSlice';
import quotesReducer from './features/quotes/quotesSlice';
import quoteFormReducer from './features/quote/quoteFormSlice';
import geographicSiteReducer from './features/geographicSite/geographicSiteSlice';
import giniReducer from './features/gini/giniSlice';
import customerReducer from './features/customer/customerSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  dashboard: dashboardReducer,
  quotes: quotesReducer,
  quoteForm: quoteFormReducer,
  geographicSite: geographicSiteReducer,
  gini: giniReducer,
  customer: customerReducer
});

export default rootReducer;
