import type { Ammo } from '../../server/interfaces/dao/Ammo';
import { MessageEmbed } from 'discord.js';
import { DataAccess } from './DataAccess';

export class AmmoInformation
{
    private title = 'Ammunition';

    async request(query: string, {embed}: {embed: boolean}): Promise<MessageEmbed | Ammo>
    {
        const store = new DataAccess;

        const data = <unknown>await store.getData({
            collection: 'ammo',
            path: 'Name',
            query
        }) as Ammo;
        
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