import type { MessageEmbed } from 'discord.js';
import type { Backpack } from '../../server/interfaces/dao/Backpack';
import type { DataAccess } from '../../server/interfaces/dao/DataAccess';
import { BaseDataAccess } from './BaseDataAccess';

export class BackpackDataAccess extends BaseDataAccess implements DataAccess<Backpack>
{
    private title = 'Backpack';

    async request(query: string, {embed}: {embed: boolean}): Promise<MessageEmbed | Backpack>
    {
        const data = <unknown>await this.getData({
            collection: 'backpacks',
            path: 'Name',
            query
        }, true) as Backpack;
        
        if (!data) {
            this.embedNotFound(query, this.title);
        }
        
        if (embed) {
            return this.embedData({
                data,
                title: this.title,
                query
            });
        }
        
        return data;
    }
}

export const backpacker = new BackpackDataAccess;