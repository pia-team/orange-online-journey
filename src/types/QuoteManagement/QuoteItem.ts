import { AppointmentRef } from './AppointmentRef';
import { AttachmentRefOrValue } from './AttachmentRefOrValue';
import { Authorization } from './Authorization';
import { Characteristic } from './Characteristic';
import { ContactMedium } from './ContactMedium';
import { Note } from './Note';
import { ProductOfferingQualificationItemRef } from './ProductOfferingQualificationItemRef';
import { ProductOfferingRef } from './ProductOfferingRef';
import { ProductRefOrValue } from './ProductRefOrValue';
import { QuoteItemRelationship } from './QuoteItemRelationship';
import { QuotePrice } from './QuotePrice';
import { RelatedParty } from './RelatedParty';
import { Sla } from './Sla';

type FalloutStatus = 'Open' | 'Resolved';

export interface BusinessFallout {
  id?: string;
  userCreated?: string;
  createdDate?: string;
  falloutType?: string;
  falloutReason?: string;
  falloutNotes?: string;
  falloutNotifiedUsers?: string[] | [];
  status: FalloutStatus;
  userResolved?: string;
  resolvedDate?: string;
  resolutionNotes?: string;
  resolutionNotifiedUsers?: string[] | [];
  quoteId?: string;
  quoteItemId?: string;
}

export interface QuoteItem {
  id: string;
  action?: string;
  quantity?: number;
  state?: string;
  appointment?: AppointmentRef[];
  attachment?: AttachmentRefOrValue[];
  note?: Note[];
  externalSystemId?: string;
  product?: ProductRefOrValue;
  productOffering?: ProductOfferingRef;
  productOfferingQualificationItem?: ProductOfferingQualificationItemRef;
  quoteItem?: QuoteItem[];
  quoteItemAuthorization?: Authorization[];
  quoteItemPrice?: QuotePrice[];
  quoteItemRelationship?: QuoteItemRelationship[];
  relatedParty?: RelatedParty[];
  itemTotalPrice?: QuotePrice[];
  '@baseType'?: string;
  '@schemaLocation'?: string;
  '@type'?: string;
  quoteItemCharacteristic?: Characteristic[];
  stage?: string;
  atBaseType?: string;
  atSchemaLocation?: string;
  atType?: string;
  externalId?: string;
  sla?: Sla[];
  contactMedium?: ContactMedium[];
  businessFallout?: BusinessFallout[];
}
