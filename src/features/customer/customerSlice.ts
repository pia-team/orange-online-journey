import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Customer } from '../../services/types';
import keycloak from '../../keycloak';
import axiosInstance from '@/services/axiosConfig';
import { api } from '../../config';


interface CustomerState {
  data: Customer | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}


const initialState: CustomerState = {
  data: null,
  status: 'idle',
  error: null,
};


const getCustomerId = (): string => {
  try {
    if (keycloak.tokenParsed) {
      return keycloak.tokenParsed.Customer_ID;
    }
    return 'F46149097';
  } catch (error) {
    console.error('Error getting customer ID from token', error);
    return 'F46149097';
  }
};


export const fetchCustomerAsync = createAsyncThunk(
  'customer/fetchCustomer',
  async (params: { customerId?: string } | undefined, { rejectWithValue }) => {
    try {

      const id = params?.customerId || getCustomerId();
      

      const response = await axiosInstance.get<Customer>(`${api.customer.CUSTOMER_BY_ID(id)}`);
      
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch customer');
    }
  }
);


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


export const { clearCustomer } = customerSlice.actions;
export default customerSlice.reducer;
