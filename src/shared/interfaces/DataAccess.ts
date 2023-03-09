import type { EmbedBuilder } from 'discord.js';
import type { Device } from './resource/Device';

export type DataAccessResource = Device;

export interface DataAccess<K> {
  request(path: string, query: string, {embed}: {embed: boolean}): Promise<EmbedBuilder | K>
}

export interface DataAccessRequest {
    collection: string;
    path: string;
    query: string;
}

export interface DataAccessEmbed {
    data: DataAccessResource;
    title: string;
    query: string;
}