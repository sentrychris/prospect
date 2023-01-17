import type { Backpack } from '../../server/interfaces/dao/Backpack';
import { MessageEmbed } from 'discord.js';
import { DataAccess } from './DataAccess';

export class BackpackInformation
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

export const backpacker = new BackpackInformation;