export interface QuotesRequestModel {
    filter?: string;
    limit?: number;
    offset?: number;
    'quoteDate<'?: string;
    'quoteDate>'?: string;
    'sort'?: string;
}
