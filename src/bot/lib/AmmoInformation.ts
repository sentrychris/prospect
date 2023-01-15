import type { Ballistics } from '../../server/interfaces/dao/Ballistics';
import { MessageEmbed } from 'discord.js';
import { DataAccess } from './DataAccess';

export class AmmoInformation
{
    private title = 'Ammunition';

    async request(query: string, {embed}: {embed: boolean}): Promise<MessageEmbed | Ballistics>
    {
        const store = new DataAccess;

        const data = <unknown>await store.getData({
            collection: 'ammo',
            path: 'Name',
            query
        }) as Ballistics;
        
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

export const armorer = new AmmoInformation;