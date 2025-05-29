import type { RelatedParty } from "./RelatedParty";

export interface Authorization {
    givenDate?: string;
    name?: string;
    requestedDate?: string;
    signatureRepresentation?: string;
    state?: string;
    approver?: RelatedParty[];
    '@baseType'?: string;
    '@schemaLocation'?: string;
    '@type'?: string;
  }