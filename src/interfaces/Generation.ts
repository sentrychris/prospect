export interface ControllerOptions {
  controller: string;
  resource: string;
  repository: string;
}

export interface RepositoryOptions {
  repository: string;
  resource: string;
}

export interface ResourceOptions {
  resource: string;
}

export interface Generation {
  options: unknown;
  content?: string | null;
  stub(dialect: string, stub: string): Promise<string>
  save(type: string, content: string): Promise<string>
  replaceToken(content: string, find: string, replace: string): string
  escapeRegExp(content: string): string
  clearContent(): void
}

export interface Maker extends Generation {
  fill(content?: string): Promise<string>
  definition(content: string): Promise<string>
}