import { Price } from "./Price";
import { ProductOfferingPriceRef } from "./ProductOfferingPriceRef";

export interface PriceAlteration {
    applicationDuration?: number;
    description?: string;
    name?: string;
    priceType?: string;
    priority?: number;
    alterationType?: string;
    recurringChargePeriod?: string;
    unitOfMeasure?: string;
    price?: Price;
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