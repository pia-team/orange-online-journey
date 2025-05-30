import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { Quote } from '../../types/QuoteManagement/Quote';
import type { QuoteQueryParams } from '../../services/types';
import { sortQuotes } from '../../services/quoteService';
import keycloak from '../../keycloak';
import axiosInstance from '@/services/axiosConfig';
import { api } from '../../config';


interface QuotesState {
  data: Quote[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  totalCount: number;
  selectedQuote: Quote | null;
  selectedQuoteStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  selectedQuoteError: string | null;
}


const initialState: QuotesState = {
  data: [],
  status: 'idle',
  error: null,
  totalCount: 0,
  selectedQuote: null,
  selectedQuoteStatus: 'idle',
  selectedQuoteError: null,
};


const getCustomerId = (): string => {
  try {
    if (keycloak.tokenParsed) {
      return keycloak.tokenParsed.Customer_ID;
    }
    return 'F73143540';
  } catch (error) {
    console.error('Error getting customer ID from token', error);
    return 'F73143540';
  }
};


export const fetchQuoteByIdAsync = createAsyncThunk(
  'quotes/fetchQuoteById',
  async (params: { id: string, depth?: number, expand?: string }, { rejectWithValue }) => {
    try {
      
      const response = await axiosInstance.get<Quote>(api.quote.QUOTE_BY_ID(params.id), {
        params: {
          depth: params.depth || 2,
          expand: params.expand || 'relatedParty.account'
        }
      });
      
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch quote');
    }
  }
);


export const fetchQuotesAsync = createAsyncThunk(
  'quotes/fetchQuotes',
  async (params: Omit<QuoteQueryParams, 'customerId'>, { rejectWithValue }) => {
    try {
      
      const customerId = getCustomerId();
      
      
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
      
      
      const response = await axiosInstance.get<Quote[]>(api.quote.QUOTES, {
        params: axiosParams
      });
      const count = parseInt(response.headers?.['x-total-count'] || '0', 10);
      return {
        data: response.data,
        count: count || response.data.length
      };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch quotes');
    }
  }
);


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
    clearSelectedQuote: (state) => {
      state.selectedQuote = null;
      state.selectedQuoteStatus = 'idle';
      state.selectedQuoteError = null;
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
        state.data = sortQuotes(action.payload.data);
        state.totalCount = action.payload.count;
      })
      .addCase(fetchQuotesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Something went wrong';
      })

      .addCase(fetchQuoteByIdAsync.pending, (state) => {
        state.selectedQuoteStatus = 'loading';
        state.selectedQuoteError = null;
      })
      .addCase(fetchQuoteByIdAsync.fulfilled, (state, action: PayloadAction<Quote>) => {
        state.selectedQuoteStatus = 'succeeded';
        state.selectedQuote = action.payload;
      })
      .addCase(fetchQuoteByIdAsync.rejected, (state, action) => {
        state.selectedQuoteStatus = 'failed';
        state.selectedQuoteError = action.payload as string || 'Something went wrong';
      });
  },
});


export const { clearQuotes, clearSelectedQuote } = quotesSlice.actions;
export default quotesSlice.reducer;
