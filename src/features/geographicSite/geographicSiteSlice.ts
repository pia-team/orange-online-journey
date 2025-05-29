import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import axiosInstance from '../../services/axiosConfig';

// API endpoint for geographic site data
const GEOGRAPHIC_SITE_API = 'https://orange-si-geographic-site.dnextdev-orange.com/api';

// Define interfaces for POP Location data
export interface POPLocation {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  country: string;
}

interface APIResponseItem {
  id: string;
  name: string;
  description: string;
  place?: {
    address?: {
      streetNr?: string;
      street?: string;
      city?: string;
      country?: string;
    }
  }
}

// API Error interface
interface ApiError {
  response?: {
    status?: number;
  };
  message?: string;
}

// Define the geographic site state
interface GeographicSiteState {
  locations: POPLocation[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: GeographicSiteState = {
  locations: [],
  status: 'idle',
  error: null
};

// Helper function to handle 401 errors without page refresh
const handleAuth401Error = (error: ApiError): POPLocation[] => {
  if (error.response && error.response.status === 401) {
    console.warn('Authentication error on POP locations API - ignoring refresh');
    return [];
  }
  console.error('Error fetching POP locations:', error.message || 'Unknown error');
  return [];
};

// Thunk action to fetch POP locations
export const fetchPOPLocations = createAsyncThunk(
  'geographicSite/fetchPOPLocations',
  async (searchTerm: string) => {
    try {
      if (searchTerm.length < 2) return [];
      
      // Global axiosInstance'ı kullanarak otomatik token eklenmiş istek yapıyoruz
      const response = await axiosInstance.get(
        `${GEOGRAPHIC_SITE_API}/geographicSiteManagement/v4/geographicSite`, {
          params: {
            atType: 'POP',
            expand: 'place',
            'description*': searchTerm
          }
        }
      );
      
      // Transform API response to match our POPLocation format
      return response.data;
    } catch (error) {
      // Handle 401 Authentication errors to prevent page refresh
      return handleAuth401Error(error as ApiError);
    }
  }
);

// Create the geographic site slice
const geographicSiteSlice = createSlice({
  name: 'geographicSite',
  initialState,
  reducers: {
    clearLocations: (state) => {
      state.locations = [];
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPOPLocations.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPOPLocations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.locations = action.payload;
      })
      .addCase(fetchPOPLocations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch locations';
      });
  },
});

// Export actions
export const { clearLocations } = geographicSiteSlice.actions;

// Export selectors
export const selectPOPLocations = (state: RootState) => state.geographicSite.locations;
export const selectGeographicSiteStatus = (state: RootState) => state.geographicSite.status;
export const selectGeographicSiteError = (state: RootState) => state.geographicSite.error;

export default geographicSiteSlice.reducer;
