import { Point } from "./Point";

export interface GeographicLocation {
    id?: string;
    href?: string;
    bbox?: number[];
    '@type'?: string;
    geoJson?: Point;
}