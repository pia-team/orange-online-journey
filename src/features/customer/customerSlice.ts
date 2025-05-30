import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Customer } from '../../services/types';
import keycloak from '../../keycloak';
import axiosInstance from '@/services/axiosConfig';
const DEFAULT_BASE_URL = 'https://dcm-api.dnextdev-orange.com/api';

// Define the customer state type
interface CustomerState {
  data: Customer | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: CustomerState = {
  data: null,
  status: 'idle',
  error: null,
};

// Extract customer ID from Keycloak token
const getCustomerId = (): string => {
  try {
    if (keycloak.tokenParsed) {
      return keycloak.tokenParsed.Customer_ID; // Fallback ID if not in token
    }
    return 'F46149097'; // Default ID for development
  } catch (error) {
    console.error('Error getting customer ID from token', error);
    return 'F46149097'; // Default ID as fallback
  }
};

// Async thunk for fetching customer
export const fetchCustomerAsync = createAsyncThunk(
  'customer/fetchCustomer',
  async (params: { customerId?: string } | undefined, { rejectWithValue }) => {
    try {
      // Use provided customer ID or get from token
      const id = params?.customerId || getCustomerId();
      
      // Make the API request using axios
      const response = await axiosInstance.get<Customer>(`/customerManagement/v4/customer/${id}`, {
        baseURL: DEFAULT_BASE_URL
      });
      
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch customer');
    }
  }
);

// Create the customer slice
const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    clearCustomer: (state) => {
      state.data = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCustomerAsync.fulfilled, (state, action: PayloadAction<Customer>) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCustomerAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Something went wrong';
      });
  },
});

// Export actions and reducer
export const { clearCustomer } = customerSlice.actions;
export default customerSlice.reducer;
