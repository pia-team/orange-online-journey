import type { Quote, QuoteQueryParams, QuoteResponse } from './types';
import { get } from './httpClient';

/**
 * Fetch quotes from the API with filtering and pagination
 */
export const fetchQuotes = async (params: QuoteQueryParams): Promise<QuoteResponse> => {
  try {
    // Prepare Axios params object
    const axiosParams: Record<string, string | number> = {
      'state!=': 'cancelled',
      limit: params.limit,
      offset: params.offset,
      depth: params.depth || 2,
      expand: params.expand || 'relatedParty.account',
      sort: params.sort || '-createdDate',
      'relatedParty.id': params.customerId
    };
    
    // Add channel filter if provided
    if (params.channel) {
      axiosParams['channel.name'] = params.channel;
    }
    
    // Make the API call using our httpClient
    const response = await get<QuoteResponse>('/quoteManagement/v4/quote', {
      params: axiosParams
    });

    // Axios response has data property that contains the response body
    return response.data;
  } catch (error) {
    console.error('Error fetching quotes:', error);
    throw error;
  }
};

/**
 * Format date from API to readable format
 */
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch (e) {
    console.error('Error formatting date:', e);
    return dateString;
  }
};

/**
 * Sort quotes with InProgress status at the top, then by expectedQuoteCompletionDate
 */
export const sortQuotes = (quotes: Quote[]): Quote[] => {
  return [...quotes].sort((a, b) => {
    // First sort by state (InProgress at the top)
    if (a.state.toLowerCase() === 'inprogress' && b.state.toLowerCase() !== 'inprogress') {
      return -1;
    }
    if (a.state.toLowerCase() !== 'inprogress' && b.state.toLowerCase() === 'inprogress') {
      return 1;
    }
    
    // Then sort by expectedQuoteCompletionDate in descending order
    const dateA = new Date(a.expectedQuoteCompletionDate).getTime();
    const dateB = new Date(b.expectedQuoteCompletionDate).getTime();
    return dateB - dateA;
  });
};
