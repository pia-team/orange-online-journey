import type { RootState } from '../../store';
import type { Customer } from '../../services/types';

export const selectCustomer = (state: RootState): Customer | null => state.customer.data;

export const selectCustomerStatus = (state: RootState): 'idle' | 'loading' | 'succeeded' | 'failed' => {
  return state.customer.status;
};

export const selectCustomerError = (state: RootState): string | null => state.customer.error;

export const selectCustomerName = (state: RootState): string => state.customer.data?.name || 'N/A';

export const selectCustomerAccounts = (state: RootState) => state.customer.data?.customerAccount || [];

export const selectCustomerContacts = (state: RootState) => state.customer.data?.contactMedium || [];

export const selectCustomerCharacteristics = (state: RootState) => state.customer.data?.characteristic || [];
