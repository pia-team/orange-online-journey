import type { ExternalIdentifier } from "./ExternalIdentifier";
import type { GeographicLocation } from "./GeographicLocation";
import type { GeographicSubAddress } from "./GeographicSubAddress";
import type { RelatedParty } from "./RelatedParty";

export interface GeographicAddress {
    id?: string;
    href?: string;
    city?: string;
    country?: string;
    locality?: string;
    name?: string;
    postcode?: string;
    stateOrProvince?: string;
    streetName?: string;
    streetNr?: string;
    streetNrLast?: string;
    streetNrLastSuffix?: string;
    streetNrSuffix?: string;
    streetSuffix?: string;
    streetType?: string;
    geographicSubAddress?: GeographicSubAddress[];
    geographicLocation?: GeographicLocation;
    '@baseType'?: string;
    '@schemaLocation'?: string;
    '@type'?: string;
    role?: string;
    addressType?: string;
    siteCategory?: string;
    siteFeature?: string;
    creationDate?: string;
    lastUpdateDate?: string;
    relatedParty?: RelatedParty[];
    externalIdentifier?: ExternalIdentifier[];
    subLocality?: string;
  }