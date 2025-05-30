import { RelatedPlaceRefOrValue } from "./RelatedPlaceRefOrValue";

export interface MediumCharacteristic {
  city?: string;
  contactType?: string;
  country?: string;
  emailAddress?: string;
  faxNumber?: string;
  phoneNumber?: string;
  postCode?: string;
  socialNetworkId?: string;
  stateOrProvince?: string;
  street1?: string;
  street2?: string;
  place?: RelatedPlaceRefOrValue[];
  '@baseType'?: string;
  '@schemaLocation'?: string;
  '@type'?: string;
}
