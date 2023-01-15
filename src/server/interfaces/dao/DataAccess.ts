import { Ballistics } from './Ballistics';
import { Medical } from './Medical';
import { Provisions } from './Provisions';

type DataAccessObject = Ballistics | Medical | Provisions;  

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