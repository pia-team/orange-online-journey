import { type CategoryRef } from './CategoryRef';
export interface Note {
  id?: string;
  author?: string;
  date?: any;
  text?: string;
  category?: CategoryRef;
  '@baseType'?: string;
  '@schemaLocation'?: string;
  '@type'?: string;
}
