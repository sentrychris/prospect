import type { DataAccess } from "./DataAccess";

export interface Provisions extends DataAccess {
    'Icon': string;
    'Name': string;
    'Energy': string;
    'Hydration': string;
    'Use Time (s)': string;
    'Notes': string;
}