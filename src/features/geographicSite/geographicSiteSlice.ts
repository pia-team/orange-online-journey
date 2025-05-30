import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import axiosInstance from '../../services/axiosConfig';
import { api } from '../../config';




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


interface ApiError {
  response?: {
    status?: number;
  };
  message?: string;
}


interface GeographicSiteState {
  locations: POPLocation[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}


const initialState: GeographicSiteState = {
  locations: [],
  status: 'idle',
  error: null
};


const handleAuth401Error = (error: ApiError): POPLocation[] => {
  if (error.response && error.response.status === 401) {
    console.warn('Authentication error on POP locations API');
    return [];
  }
  console.error('Error fetching POP locations:', error.message || '');
  return [];
};


export const fetchPOPLocations = createAsyncThunk(
  'geographicSite/fetchPOPLocations',
  async (searchTerm: string) => {
    try {
      if (searchTerm.length < 2) return [];
      

      const response = await axiosInstance.get(
        `${api.geographicSite.BASE}/geographicSiteManagement/v4/geographicSite`, {
          params: {
            atType: 'POP',
            expand: 'place',
            'description*': searchTerm
          }
        }
      );
      

      return response.data;
    } catch (error) {

      return handleAuth401Error(error as ApiError);
    }
  }
);


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


export const { clearLocations } = geographicSiteSlice.actions;


export const selectPOPLocations = (state: RootState) => state.geographicSite.locations;
export const selectGeographicSiteStatus = (state: RootState) => state.geographicSite.status;
export const selectGeographicSiteError = (state: RootState) => state.geographicSite.error;

export default geographicSiteSlice.reducer;
