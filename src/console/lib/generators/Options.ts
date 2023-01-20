export interface ImporterOptions {
  classname: string;
  key: string;
  collection: string;
  types: string;
  repository: string;
}

export interface RepositoryOptions {
  classname: string;
  key: string;
  collection: string;
  resource: string;
  types: string;
  parser: string;
}

export interface ParserOptions {
  classname: string;
  resource: string;
}

export interface DataAccessOptions {
  classname: string;
  resource: string;
  title: string;
  export: string;
}