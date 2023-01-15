import type { Armor } from '../../server/interfaces/dao/Armor';
import { MessageEmbed } from 'discord.js';
import { DataAccess } from './DataAccess';

export class ArmorInformation
{
    private title = 'Armor';

    async request(query: string, {embed}: {embed: boolean}): Promise<MessageEmbed | Armor>
    {
        const store = new DataAccess;

        const data = <unknown>await store.getData({
            collection: 'armor',
            path: 'Name',
            query
        }, true) as Armor;
        
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

export const tailor = new ArmorInformation;