import { Ammo } from './Ammo';
import { Medical } from './Medical';
import { Provisions } from './Provisions';

type DataAccessObject = Ammo | Medical | Provisions;  

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