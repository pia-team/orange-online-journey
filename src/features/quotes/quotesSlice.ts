import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Quote, QuoteQueryParams } from '../../services/types';
import { sortQuotes } from '../../services/quoteService';
import keycloak from '../../keycloak';
import axiosInstance from '@/services/axiosConfig';
const DEFAULT_BASE_URL = 'https://quote-api.dnextdev-orange.com/api';

// Define the quotes state type
interface QuotesState {
  data: Quote[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  totalCount: number;
}

// Initial state
const initialState: QuotesState = {
  data: [],
  status: 'idle',
  error: null,
  totalCount: 0,
};

// Extract customer ID from Keycloak token
const getCustomerId = (): string => {
  try {
    if (keycloak.tokenParsed) {
      return keycloak.tokenParsed.customer_id || 'F73143540'; // Fallback ID if not in token
    }
    return 'F73143540'; // Default ID for development
  } catch (error) {
    console.error('Error getting customer ID from token', error);
    return 'F73143540'; // Default ID as fallback
  }
};

// Async thunk for fetching quotes
export const fetchQuotesAsync = createAsyncThunk(
  'quotes/fetchQuotes',
  async (params: Omit<QuoteQueryParams, 'customerId'>, { rejectWithValue }) => {
    try {
      // Get customer ID from token
      const customerId = getCustomerId();
      
      // Prepare Axios params object - Type-safe approach
      const axiosParams: Record<string, string | number> = {
        'state!=': 'cancelled',
        limit: params.limit,
        offset: params.offset,
        depth: params.depth || 2,
        expand: params.expand || 'relatedParty.account',
        sort: params.sort || '-createdDate',
        'relatedParty.id': customerId,
        'channel.name': 'Online'
      };
      
      // Make the API request using axios with params
      const response = await axiosInstance.get<Quote[]>('/quoteManagement/v4/quote', {
        params: axiosParams,
        baseURL: DEFAULT_BASE_URL
      });
      
      // Get the total count from response headers
      const count = parseInt(response.headers?.['x-total-count'] || '0', 10);
      
      return {
        data: response.data,
        count: count || response.data.length // Fallback to data length if header not available
      };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch quotes');
    }
  }
);

// Create the quotes slice
const quotesSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    clearQuotes: (state) => {
      state.data = [];
      state.status = 'idle';
      state.error = null;
      state.totalCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuotesAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchQuotesAsync.fulfilled, (state, action: PayloadAction<{ data: Quote[], count: number }>) => {
        state.status = 'succeeded';
        state.data = sortQuotes(action.payload.data); // Sort quotes as specified
        state.totalCount = action.payload.count;
      })
      .addCase(fetchQuotesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Something went wrong';
      });
  },
});

// Export actions and reducer
export const { clearQuotes } = quotesSlice.actions;
export default quotesSlice.reducer;
