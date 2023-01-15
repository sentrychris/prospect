export interface DataAccess {}

export interface DataAccessRequest extends DataAccess {
    collection: string;
    path: string;
    query: string;
}

export interface DataAccessEmbed extends DataAccess {
    data: DataAccess;
    title: string;
    query: string;
}