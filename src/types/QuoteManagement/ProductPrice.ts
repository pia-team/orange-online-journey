import { BillingAccountRef } from "./BillingAccountRef";
import { Price } from "./Price";
import { PriceAlteration } from "./PriceAlteration";
import { ProductOfferingPriceRef } from "./ProductOfferingPriceRef";

export interface ProductPrice {
    description?: string;
    name?: string;
    priceType?: string;
    recurringChargePeriod?: string;
    unitOfMeasure?: string;
    billingAccount?: BillingAccountRef;
    price?: Price;
    productOfferingPrice?: ProductOfferingPriceRef;
    productPriceAlteration?: PriceAlteration[];
    pricingCategory?: string;
    recurringChargePeriodLength?: number;
    recurringChargePeriodCount?: number;
    salesTime?: string;
    advancedPricingMethod?: string;
    '@baseType'?: string;
    '@schemaLocation'?: string;
    '@type'?: string;
}