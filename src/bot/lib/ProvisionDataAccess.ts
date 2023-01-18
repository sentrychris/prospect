import type { MessageEmbed } from 'discord.js';
import type { Provisions } from '../../server/interfaces/dao/Provisions';
import type { DataAccess } from '../../server/interfaces/dao/DataAccess';
import { BaseDataAccess } from './BaseDataAccess';

export class ProvisionDataAccess extends BaseDataAccess implements DataAccess<Provisions>
{
    private title = 'Consumable';

    async request(query: string, {embed}: {embed: boolean}): Promise<MessageEmbed | Provisions>
    {
        const data = <unknown>await this.getData({
            collection: 'provisions',
            path: 'Name',
            query
        }) as Provisions;
        
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

export const provisioner = new ProvisionDataAccess;