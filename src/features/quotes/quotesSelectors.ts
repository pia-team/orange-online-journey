import type { RootState } from '../../store';
import type { Quote } from '../../services/types';
import type { QuoteTableItem } from '../../components/dashboard';
import { formatDate } from '../../services/quoteService';

// Select all quotes from state
export const selectAllQuotes = (state: RootState): Quote[] => state.quotes.data;

// Select quotes loading status
export const selectQuotesStatus = (state: RootState): 'idle' | 'loading' | 'succeeded' | 'failed' => {
  return state.quotes.status;
};

// Select quotes error message
export const selectQuotesError = (state: RootState): string | null => state.quotes.error;

// Select total quotes count for pagination
export const selectQuotesTotalCount = (state: RootState): number => state.quotes.totalCount;

// Transform Quote objects to QuoteTableItem objects for UI display
export const selectQuoteTableItems = (state: RootState): QuoteTableItem[] => {
  return state.quotes.data.map(quote => {
    const offerName = quote.quoteItem[0]?.product?.name || 'Unknown Offer';
    
    return {
      id: quote.id,
      state: quote.state,
      offerName,
      creationDate: formatDate(quote.createdDate),
      estimatedDate: formatDate(quote.expectedQuoteCompletionDate),
      owner: quote.createdBy,
      quote: quote
    };
  });
};
