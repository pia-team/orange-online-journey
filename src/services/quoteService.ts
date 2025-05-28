import type { Quote, QuoteQueryParams, QuoteResponse } from './types';

const BASE_URL = 'https://quote-api.dnextdev-orange.com/api';

/**
 * Fetch quotes from the API with filtering and pagination
 */
export const fetchQuotes = async (params: QuoteQueryParams): Promise<QuoteResponse> => {
  try {
    // Build query parameters
    const queryParams = new URLSearchParams();
    
    // Add required parameters
    queryParams.append('state!=', 'cancelled');
    queryParams.append('limit', params.limit.toString());
    queryParams.append('offset', params.offset.toString());
    queryParams.append('depth', (params.depth || 2).toString());
    queryParams.append('expand', params.expand || 'relatedParty.account');
    queryParams.append('sort', params.sort || '-createdDate');
    queryParams.append('relatedParty.id', params.customerId);
    
    // Add channel filter if provided
    if (params.channel) {
      queryParams.append('channel.name', params.channel);
    }
    
    const response = await fetch(`${BASE_URL}/quoteManagement/v4/quote?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add any required authorization headers here
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: QuoteResponse = await response.json();
    return data;
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
