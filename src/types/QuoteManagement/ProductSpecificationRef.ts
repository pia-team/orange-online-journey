import { TargetProductSchema } from "./TargetProductSchema";

export interface ProductSpecificationRef {
  id?: string;
  href?: string;
  name?: string;
  version?: string;
  targetProductSchema?: TargetProductSchema;
  '@baseType'?: string;
  '@schemaLocation'?: string;
  '@type'?: string;
  '@referredType'?: string;
}