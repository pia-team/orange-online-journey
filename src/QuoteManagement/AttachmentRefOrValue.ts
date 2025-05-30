import { Quantity } from "./Quantity";
import { TimePeriod } from "./TimePeriod";

export interface AttachmentRefOrValue {
    id?: string;
    href?: string;
    attachmentType?: string;
    content?: string;
    description?: string;
    mimeType?: string;
    name?: string;
    url?: string;
    size?: Quantity;
    validFor?: TimePeriod;
    '@baseType'?: string;
    '@schemaLocation'?: string;
    '@type'?: string;
    '@referredType'?: string;
  }