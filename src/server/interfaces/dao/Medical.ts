import type { DataAccess } from "./DataAccess";

export interface Medical extends DataAccess {
    'Icon': string;
    'Name': string;
    'Type': string;
    'Buffs': string;
    'Debuffs': string;
    'Use Time (s)': string;
    'Uses': string;
    'HP Pool': string;
    'Max HP heal/use': string;
}