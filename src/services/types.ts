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

// Customer API response types

export interface CustomerAddress {
  role: string;
  street1?: string;
  street2?: string;
  city?: string;
  stateOrProvince?: string;
  postcode?: string;
  country?: string;
}

export interface CustomerContact {
  contactType: string;
  contactMedium?: string;
  preferred?: boolean;
  emailAddress?: string;
  phoneNumber?: string;
}

export interface CustomerRelatedParty {
  id: string;
  role: string;
  name?: string;
}

export interface CustomerCharacteristic {
  name: string;
  value: string;
}

export interface Customer {
  id: string;
  href?: string;
  name: string;
  status: string;
  statusReason?: string;
  customerRank?: string;
  customerType?: string;
  customerCategory?: string;
  creditScore?: number;
  accountManagerName?: string;
  engagedParty?: {
    id: string;
    href?: string;
    name?: string;
  };
  customerAccount?: Array<{
    id: string;
    name?: string;
    accountType?: string;
  }>;
  contactMedium?: CustomerContact[];
  characteristic?: CustomerCharacteristic[];
  relatedParty?: CustomerRelatedParty[];
}
