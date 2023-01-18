import type { MessageEmbed } from 'discord.js';
import type { Backpack } from '../../server/interfaces/dao/Backpack';
import { BaseDataAccess } from './BaseDataAccess';

export class BackpackDataAccess extends BaseDataAccess<Backpack>
{
    async request(query: string, {embed}: {embed: boolean}): Promise<MessageEmbed | Backpack>
    {
        this.title = 'Backpack';
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