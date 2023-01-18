import type { MessageEmbed } from 'discord.js';
import type { Ammo } from '../../server/interfaces/dao/Ammo';
import { BaseDataAccess } from './BaseDataAccess';

export class AmmoDataAccess extends BaseDataAccess<Ammo>
{
    async request(query: string, {embed}: {embed: boolean}): Promise<MessageEmbed | Ammo>
    {
        this.title = 'Ammunition';

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