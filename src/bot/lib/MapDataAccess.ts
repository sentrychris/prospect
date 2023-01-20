import type { MessageEmbed } from 'discord.js';
import type { Map } from '../../shared/interfaces/resource/Map';
import { BaseDataAccess } from './BaseDataAccess';
import { MongoCollectionKey } from '../../shared/enums/collections';

export class MapDataAccess extends BaseDataAccess<Map>
{
    async request(path: string, query: string, {embed}: {embed: boolean}): Promise<MessageEmbed | Map>
    {
        this.title = 'Map';
        this.collection = MongoCollectionKey.Map;

        return super.request(path, query, {embed});
    }
}

export const mapper = new MapDataAccess;