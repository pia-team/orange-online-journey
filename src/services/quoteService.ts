import type { QuoteQueryParams, QuoteResponse } from './types';
import type { Quote } from '../types/QuoteManagement/Quote';
import { get } from './httpClient';
import { api } from '../config/api';


export const fetchQuotes = async (params: QuoteQueryParams): Promise<QuoteResponse> => {
  try {

    const axiosParams: Record<string, string | number> = {
      'state!=': 'cancelled',
      limit: params.limit,
      offset: params.offset,
      depth: params.depth || 2,
      expand: params.expand || 'relatedParty.account',
      sort: params.sort || '-createdDate',
      'relatedParty.id': params.customerId
    };
    

    if (params.channel) {
      axiosParams['channel.name'] = params.channel;
    }
    

    const response = await get<QuoteResponse>(api.quote.QUOTES, {
      params: axiosParams
    });


    return response.data;
  } catch (error) {
    console.error('Error fetching quotes:', error);
    throw error;
  }
};


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


export const sortQuotes = (quotes: Quote[]): Quote[] => {
  if (!quotes || quotes.length === 0) return [];
  return [...quotes].sort((a, b) => {
    const stateA = a.state?.toLowerCase() || '';
    const stateB = b.state?.toLowerCase() || '';
    
    if (stateA === 'inprogress' && stateB !== 'inprogress') {
      return -1;
    }
    if (stateA !== 'inprogress' && stateB === 'inprogress') {
      return 1;
    }
    
    const dateA = a.expectedQuoteCompletionDate ? new Date(a.expectedQuoteCompletionDate).getTime() : 0;
    const dateB = b.expectedQuoteCompletionDate ? new Date(b.expectedQuoteCompletionDate).getTime() : 0;
    return dateB - dateA;
  });
};
