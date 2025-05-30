import type { RootState } from '../../store';
import type { Quote } from '../../types/QuoteManagement/Quote';
import type { QuoteTableItem } from '../../components/dashboard';
import { formatDate } from '../../services/quoteService';

export const selectAllQuotes = (state: RootState): Quote[] => state.quotes.data;

export const selectQuotesStatus = (state: RootState): 'idle' | 'loading' | 'succeeded' | 'failed' => {
  return state.quotes.status;
};

export const selectQuotesError = (state: RootState): string | null => state.quotes.error;

export const selectQuotesTotalCount = (state: RootState): number => state.quotes.totalCount;

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
