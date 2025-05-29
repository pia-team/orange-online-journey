import { MediumCharacteristic } from "./MediumCharacteristic";
import { TimePeriod } from "./TimePeriod";


export interface ContactMedium {
  mediumType?: string;
  preferred?: boolean;
  characteristic?: MediumCharacteristic;
  validFor?: TimePeriod;
  '@baseType'?: string;
  '@schemaLocation'?: string;
  '@type'?: string;
}
