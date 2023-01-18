import type { MessageEmbed } from 'discord.js';
import type { Ammo } from '../../server/interfaces/dao/Ammo';
import type { BotDataAccess } from '../../server/interfaces/dao/DataAccess';
import { DataAccess } from './DataAccess';

export class AmmoDataAccess implements BotDataAccess<Ammo>
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

export const armorer = new AmmoDataAccess;