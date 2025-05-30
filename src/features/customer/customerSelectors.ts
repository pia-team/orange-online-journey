import type { RootState } from '../../store';
import type { Customer } from '../../services/types';

// Select customer data from state
export const selectCustomer = (state: RootState): Customer | null => state.customer.data;

// Select customer loading status
export const selectCustomerStatus = (state: RootState): 'idle' | 'loading' | 'succeeded' | 'failed' => {
  return state.customer.status;
};

// Select customer error message
export const selectCustomerError = (state: RootState): string | null => state.customer.error;

// Select specific customer data fields
export const selectCustomerName = (state: RootState): string => state.customer.data?.name || 'N/A';

// Select customer account information
export const selectCustomerAccounts = (state: RootState) => state.customer.data?.customerAccount || [];

// Select customer contact information
export const selectCustomerContacts = (state: RootState) => state.customer.data?.contactMedium || [];

// Select customer characteristics
export const selectCustomerCharacteristics = (state: RootState) => state.customer.data?.characteristic || [];
