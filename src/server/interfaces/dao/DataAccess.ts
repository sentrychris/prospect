import type { Ammo } from './Ammo';
import type { Armor } from './Armor';
import type { Backpack } from './Backpack';
import type { Medical } from './Medical';
import type { Provisions } from './Provisions';

type DataAccessObject = Ammo | Armor | Backpack | Medical | Provisions;  

export interface DataAccessRequest {
    collection: string;
    path: string;
    query: string;
}

export interface DataAccessEmbed {
    data: DataAccessObject;
    title: string;
    query: string;
}