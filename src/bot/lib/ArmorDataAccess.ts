import type { MessageEmbed } from 'discord.js';
import type { Armor } from '../../server/interfaces/dao/Armor';
import { BaseDataAccess } from './BaseDataAccess';

export class ArmorDataAccess extends BaseDataAccess<Armor>
{
    async request(query: string, {embed}: {embed: boolean}): Promise<MessageEmbed | Armor>
    {
        this.title = 'Armor';
      
        const data = <unknown>await this.getData({
            collection: 'armor',
            path: 'Name',
            query
        }, true) as Armor;
        
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

export const tailor = new ArmorDataAccess;