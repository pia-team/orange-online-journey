import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import axiosInstance from '../../services/axiosConfig';

// API endpoint for GINI data
const GINI_API = 'https://orange-adapter.dnextdev-orange.com/api/orange-adapter/gini/tmf645/check-customer-interface';

// Interface for GINI interface data
export interface GiniInterface {
  id: string;
  name: string;
  pop_id: string;
  interface_type: string;
  availability: string;
  // Diu011fer gerekli alanlar
}

// Interface for API parameters
interface GiniApiParams {
  code_rce: string;
  number_intf: number;
  pop_id: string;
  service_type: string;
  origin: string;
}

// API Error interface
interface ApiError {
  response?: {
    status?: number;
  };
  message?: string;
}

// Define the gini state
interface GiniState {
  endA: {
    interfaces: GiniInterface[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  };
  endB: {
    interfaces: GiniInterface[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  };
}

// Initial state
const initialState: GiniState = {
  endA: {
    interfaces: [],
    status: 'idle',
    error: null
  },
  endB: {
    interfaces: [],
    status: 'idle',
    error: null
  }
};

// Helper function to handle 401 errors without page refresh
const handleAuth401Error = (error: ApiError): GiniInterface[] => {
  if (error.response && error.response.status === 401) {
    console.warn('Authentication error on GINI API - ignoring refresh');
    return [];
  }
  console.error('Error fetching GINI interfaces:', error.message || 'Unknown error');
  return [];
};

// Thunk action to fetch interfaces for End A
export const fetchEndAInterfaces = createAsyncThunk(
  'gini/fetchEndAInterfaces',
  async (params: GiniApiParams) => {
    try {
      // API isteu011fi yap
      const response = await axiosInstance.get(GINI_API, {
        params: params,
      });
      
      // Yanu0131tu0131 console'a yazdu0131r (debug iu00e7in)
      console.log('GINI End A API response:', response.data);
      
      // API yanu0131tu0131nu0131 dou011fru formata du00f6nu00fcu015ftu00fcr
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      // Hata yu00f6netimi
      return handleAuth401Error(error as ApiError);
    }
  }
);

// Thunk action to fetch interfaces for End B
export const fetchEndBInterfaces = createAsyncThunk(
  'gini/fetchEndBInterfaces',
  async (params: GiniApiParams) => {
    try {
      // API isteu011fi yap
      const response = await axiosInstance.get(GINI_API, {
        params: params
      });
      
      // Yanu0131tu0131 console'a yazdu0131r (debug iu00e7in)
      console.log('GINI End B API response:', response.data);
      
      // API yanu0131tu0131nu0131 dou011fru formata du00f6nu00fcu015ftu00fcr
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      // Hata yu00f6netimi
      return handleAuth401Error(error as ApiError);
    }
  }
);

// Create the gini slice
const giniSlice = createSlice({
  name: 'gini',
  initialState,
  reducers: {
    clearEndAInterfaces: (state) => {
      state.endA.interfaces = [];
      state.endA.status = 'idle';
    },
    clearEndBInterfaces: (state) => {
      state.endB.interfaces = [];
      state.endB.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      // End A iu00e7in reducer'lar
      .addCase(fetchEndAInterfaces.pending, (state) => {
        state.endA.status = 'loading';
        state.endA.error = null;
      })
      .addCase(fetchEndAInterfaces.fulfilled, (state, action) => {
        state.endA.status = 'succeeded';
        state.endA.interfaces = action.payload;
      })
      .addCase(fetchEndAInterfaces.rejected, (state, action) => {
        state.endA.status = 'failed';
        state.endA.error = action.error.message || 'Failed to fetch End A interfaces';
      })
      
      // End B iu00e7in reducer'lar
      .addCase(fetchEndBInterfaces.pending, (state) => {
        state.endB.status = 'loading';
        state.endB.error = null;
      })
      .addCase(fetchEndBInterfaces.fulfilled, (state, action) => {
        state.endB.status = 'succeeded';
        state.endB.interfaces = action.payload;
      })
      .addCase(fetchEndBInterfaces.rejected, (state, action) => {
        state.endB.status = 'failed';
        state.endB.error = action.error.message || 'Failed to fetch End B interfaces';
      });
  },
});

// Export actions
export const { clearEndAInterfaces, clearEndBInterfaces } = giniSlice.actions;

// Export selectors
export const selectEndAInterfaces = (state: RootState) => state.gini.endA.interfaces;
export const selectEndAStatus = (state: RootState) => state.gini.endA.status;
export const selectEndAError = (state: RootState) => state.gini.endA.error;

export const selectEndBInterfaces = (state: RootState) => state.gini.endB.interfaces;
export const selectEndBStatus = (state: RootState) => state.gini.endB.status;
export const selectEndBError = (state: RootState) => state.gini.endB.error;

export default giniSlice.reducer;
