export interface Product {
  name: string;
}

export interface QuoteItem {
  product: Product;
}

export type QuoteState =
  | 'Draft'
  | 'In Progress'
  | 'Pending Approval'
  | 'Approved'
  | 'Rejected'
  | 'Presented'
  | 'Accepted'
  | 'Ordered'
  | 'Canceled'
  | 'Expired';

export interface Quote {
  id: string;
  quoteItem: QuoteItem;
  createdDate: Date; 
  expectedQuoteCompletionDate?: Date;
  calculatedExpectedQuoteCompletionDate?: Date;
  createdBy: string;
  state: QuoteState;
  channel: 'Online' | 'Offline' | string;
}
