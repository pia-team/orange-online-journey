import { type Characteristic } from "./Characteristic";
import { type ContactMedium } from "./ContactMedium";
import { type OrganizationIdentification } from "./OrganizationIdentification";

export interface RelatedParty {
    id?: string;
    href?: string;
    name?: string;
    role?: string;
    '@baseType'?: string;
    '@schemaLocation'?: string;
    '@type'?: string;
    '@referredType'?: string;
    isHeadOffice?: boolean;
    isLegalEntity?: boolean;
    nameType?: string;
    organizationType?: string;
    tradingName?: string;
    contactMedium?: ContactMedium[];
    organizationIdentification?: OrganizationIdentification[];
    partyCharacteristic?: Characteristic[];
    relatedParty?: string[];
  }