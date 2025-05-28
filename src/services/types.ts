// Quote API response types

export interface RelatedParty {
  id: string;
  name?: string;
  role?: string;
  account?: {
    id: string;
    name?: string;
  };
}

export interface Channel {
  id?: string;
  name: string;
}

export interface ProductItem {
  id?: string;
  name: string;
}

export interface QuoteItem {
  id?: string;
  product: ProductItem;
}

export interface Quote {
  id: string;
  href?: string;
  state: string;
  createdDate: string;
  expectedQuoteCompletionDate: string;
  createdBy: string;
  channel: Channel;
  quoteItem: QuoteItem[];
  relatedParty: RelatedParty[];
}

export interface QuoteResponse {
  count: number;
  data: Quote[];
}

export interface PaginationParams {
  limit: number;
  offset: number;
}

export interface QuoteQueryParams extends PaginationParams {
  state?: string;
  sort?: string;
  depth?: number;
  customerId: string;
  channel?: string;
  expand?: string;
}
