import { Price } from "./Price";
import { PriceAlteration } from "./PriceAlteration";
import { ProductOfferingPriceRef } from "./ProductOfferingPriceRef";

export interface QuotePrice {
  description?: string;
  name?: string;
  priceType?: string;
  recurringChargePeriod?: string;
  unitOfMeasure?: string;
  price?: Price;
  priceAlteration?: PriceAlteration[];
  productOfferingPrice?: ProductOfferingPriceRef;
  pricingCategory?: string;
  recurringChargePeriodLength?: number;
  recurringChargePeriodCount?: number;
  salesTime?: string;
  advancedPricingMethod?: string;
  '@baseType'?: string;
  '@schemaLocation'?: string;
  '@type'?: string;
}