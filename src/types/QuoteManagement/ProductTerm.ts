import { Quantity } from "./Quantity";
import { TimePeriod } from "./TimePeriod";

export interface ProductTerm {
    description?: string;
    name?: string;
    duration?: Quantity;
    validFor?: TimePeriod;
    '@baseType'?: string;
    '@schemaLocation'?: string;
    '@type'?: string;
}