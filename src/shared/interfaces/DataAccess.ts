import type { MessageEmbed } from 'discord.js';
import type { Ammo } from './resource/Ammo';
import type { Armor } from './resource/Armor';
import type { Backpack } from './resource/Backpack';
import type { Boss } from './resource/Boss';
import type { Map } from './resource/Map';
import type { Medical } from './resource/Medical';
import type { Provisions } from './resource/Provisions';
import type { Quest } from './resource/Quest';

export type DataAccessResource = Ammo | Armor | Boss | Backpack | Medical | Map | Provisions | Quest;

export interface DataAccess<K> {
  request(path: string, query: string, {embed}: {embed: boolean}): Promise<MessageEmbed | K>
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