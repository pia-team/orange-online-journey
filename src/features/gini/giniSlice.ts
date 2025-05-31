import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import axiosInstance from '../../services/axiosConfig';
import { api } from '../../config';
import { selectCustomerCodeRCE } from '../customer/customerSelectors';




export interface GiniInterface {
  id: string;
  name: string;
  pop_id: string;
  interface_type: string;
  availability: string;
}

interface GiniApiParams {
  code_rce: string;
  number_intf: number;
  pop_id: string;
  service_type: string;
  origin: string;
  type_intf?: string;
  bw_service?: string;
}

interface ApiError {
  response?: {
    status?: number;
  };
  message?: string;
}

interface GiniState {
  endA: {
    interfaces: any;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  };
  endB: {
    interfaces: any;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  };
}

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

const handleAuth401Error = (error: ApiError): GiniInterface[] => {
  if (error.response && error.response.status === 401) {
    return [];
  }
  return [];
};

export const fetchEndAInterfaces = createAsyncThunk(
  'gini/fetchEndAInterfaces',
  async (params: GiniApiParams, { getState }) => {
    try {
      // Müşteri bilgilerinden code_rce değerini al
      const state = getState() as RootState;
      const code_rce = selectCustomerCodeRCE(state) || params.code_rce;
      
      // İstenen JSON formatına göre istek gövdesi oluştur
      const baseCharacteristics = [
        { name: "code_rce", value: code_rce },
        { name: "number_intf", value: params.number_intf.toString() },
        { name: "pop_id", value: params.pop_id },
        { name: "service_type", value: params.service_type },
        { name: "origin", value: params.origin },
        params.type_intf && { name: "type_intf", value: params.type_intf },
        params.bw_service && { name: "bw_service", value: params.bw_service }
      ].filter(Boolean);
      
      const requestBody = {
        serviceQualificationItem: [
          {
            service: {
              serviceCharacteristic: baseCharacteristics
            }
          }
        ]
      };
      
      
      const response = await axiosInstance.post(api.gini.CHECK_CUSTOMER_INTERFACE, requestBody);
      return response.data.serviceQualificationItem || [];
    } catch (error) {
      return handleAuth401Error(error as ApiError);
    }
  }
);

export const fetchEndBInterfaces = createAsyncThunk(
  'gini/fetchEndBInterfaces',
  async (params: GiniApiParams, { getState }) => {
    try {
      // Müşteri bilgilerinden code_rce değerini al
      const state = getState() as RootState;
      const code_rce = selectCustomerCodeRCE(state) || params.code_rce;
      
      // İstenen JSON formatına göre istek gövdesi oluştur
      const baseCharacteristics = [
        { name: "code_rce", value: code_rce },
        { name: "number_intf", value: params.number_intf.toString() },
        { name: "pop_id", value: params.pop_id },
        { name: "service_type", value: params.service_type },
        { name: "origin", value: params.origin },
        params.type_intf && { name: "type_intf", value: params.type_intf },
        params.bw_service && { name: "bw_service", value: params.bw_service }
      ].filter(Boolean);
      
      const requestBody = {
        serviceQualificationItem: [
          {
            service: {
              serviceCharacteristic: baseCharacteristics
            }
          }
        ]
      };
      
      const response = await axiosInstance.post(api.gini.CHECK_CUSTOMER_INTERFACE, requestBody);
      return response.data.serviceQualificationItem || [];
    } catch (error) {
      return handleAuth401Error(error as ApiError);
    }
  }
);

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
      .addCase(fetchEndAInterfaces.pending, (state) => {
        state.endA.status = 'loading';
        state.endA.error = null;
      })
      .addCase(fetchEndAInterfaces.fulfilled, (state, action) => {
        state.endA.status = 'succeeded';
        state.endA.interfaces = [...state.endA.interfaces, action.payload[0]];
      })
      .addCase(fetchEndAInterfaces.rejected, (state, action) => {
        state.endA.status = 'failed';
        state.endA.error = action.error.message || 'Failed to fetch End A interfaces';
      })

      .addCase(fetchEndBInterfaces.pending, (state) => {
        state.endB.status = 'loading';
        state.endB.error = null;
      })
      .addCase(fetchEndBInterfaces.fulfilled, (state, action) => {
        state.endB.status = 'succeeded';
        state.endB.interfaces = [...state.endB.interfaces, action.payload[0]];
      })
      .addCase(fetchEndBInterfaces.rejected, (state, action) => {
        state.endB.status = 'failed';
        state.endB.error = action.error.message || 'Failed to fetch End B interfaces';
      });
  },
});


export const { clearEndAInterfaces, clearEndBInterfaces } = giniSlice.actions;


export const selectEndAInterfaces = (state: RootState) => state.gini.endA.interfaces;
export const selectEndAStatus = (state: RootState) => state.gini.endA.status;
export const selectEndAError = (state: RootState) => state.gini.endA.error;

export const selectEndBInterfaces = (state: RootState) => state.gini.endB.interfaces;
export const selectEndBStatus = (state: RootState) => state.gini.endB.status;
export const selectEndBError = (state: RootState) => state.gini.endB.error;

export default giniSlice.reducer;
