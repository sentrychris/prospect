import type { MessageEmbed } from 'discord.js';
import type { Backpack } from '../../server/interfaces/dao/Backpack';
import type { BotDataAccess } from '../../server/interfaces/dao/DataAccess';
import { DataAccess } from './DataAccess';

export class BackpackDataAccess implements BotDataAccess<Backpack>
{
    private title = 'Backpack';

    async request(query: string, {embed}: {embed: boolean}): Promise<MessageEmbed | Backpack>
    {
        const store = new DataAccess;

        const data = <unknown>await store.getData({
            collection: 'backpacks',
            path: 'Name',
            query
        }, true) as Backpack;
        
        if (!data) {
            store.embedNotFound(query, this.title);
        }
        
        if (embed) {
            return store.embedData({
                data,
                title: this.title,
                query
            });
        }
        
        return data;
    }
}

export const backpacker = new BackpackDataAccess;