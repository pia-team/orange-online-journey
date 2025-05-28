import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { get } from '../../services/httpClient';
import type { Quote, QuoteResponse, QuoteQueryParams } from '../../services/types';
import { sortQuotes } from '../../services/quoteService';
import keycloak from '../../keycloak';

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
      
      // Prepare query parameters
      const queryParams = new URLSearchParams();
      queryParams.append('state!=', 'cancelled');
      queryParams.append('limit', params.limit.toString());
      queryParams.append('offset', params.offset.toString());
      queryParams.append('depth', (params.depth || 2).toString());
      queryParams.append('expand', params.expand || 'relatedParty.account');
      queryParams.append('sort', params.sort || '-createdDate');
      queryParams.append('relatedParty.id', customerId);
      queryParams.append('channel.name', 'Online');
      
      // Make the API request
      const response = await get<QuoteResponse>(`/quoteManagement/v4/quote?${queryParams.toString()}`);
      
      return {
        data: response.data,
        count: response.headers['x-total-count'],
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
