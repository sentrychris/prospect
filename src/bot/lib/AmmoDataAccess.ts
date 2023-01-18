import type { MessageEmbed } from 'discord.js';
import type { Ammo } from '../../server/interfaces/dao/Ammo';
import type { DataAccess } from '../../server/interfaces/dao/DataAccess';
import { BaseDataAccess } from './BaseDataAccess';

export class AmmoDataAccess extends BaseDataAccess implements DataAccess<Ammo>
{
    private title = 'Ammunition';

    async request(query: string, {embed}: {embed: boolean}): Promise<MessageEmbed | Ammo>
    {
        const data = <unknown>await this.getData({
            collection: 'ammo',
            path: 'Name',
            query
        }) as Ammo;
        
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

export const armorer = new AmmoDataAccess;