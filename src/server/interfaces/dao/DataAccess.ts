import type { Ammo } from './Ammo';
import type { Armor } from './Armor';
import type { Backpack } from './Backpack';
import type { Medical } from './Medical';
import type { Provisions } from './Provisions';
import type { Quest } from './Quest';

type DataAccessObject = Ammo | Armor | Backpack | Medical | Provisions | Quest;

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