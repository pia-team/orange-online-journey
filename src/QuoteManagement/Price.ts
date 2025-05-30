import { Money } from "./Money";

export interface Price {
    percentage?: number;
    taxRate?: number;
    dutyFreeAmount?: Money;
    taxIncludedAmount?: Money;
    '@baseType'?: string;
    '@schemaLocation'?: string;
    '@type'?: string;
}