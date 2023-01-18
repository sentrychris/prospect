import type { MessageEmbed } from 'discord.js';
import type { Provisions } from '../../server/interfaces/dao/Provisions';
import { BaseDataAccess } from './BaseDataAccess';

export class ProvisionDataAccess extends BaseDataAccess<Provisions>
{
    async request(query: string, {embed}: {embed: boolean}): Promise<MessageEmbed | Provisions>
    {
        this.title = 'Consumable';

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