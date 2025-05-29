import { ExternalIdentifier } from "./ExternalIdentifier";
import { GeographicLocation } from "./GeographicLocation";

export interface GeographicSubAddress {
    id?: string;
    href?: string;
    buildingName?: string;
    levelNumber?: string;
    levelType?: string;
    name?: string;
    privateStreetName?: string;
    privateStreetNumber?: string;
    subAddressType?: string;
    subUnitNumber?: string;
    subUnitType?: string;
    '@baseType'?: string;
    '@schemaLocation'?: string;
    '@type'?: string;
    externalIdentifier?: ExternalIdentifier[];
    geographicLocation?: GeographicLocation;
}