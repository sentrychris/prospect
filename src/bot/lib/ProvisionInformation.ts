import type { Provisions } from '../../server/interfaces/dao/Provisions';
import { MessageEmbed } from 'discord.js';
import { DataAccess } from './DataAccess';

export class ProvisionInformation
{
    private title = 'Consumable';

    async request(query: string, {embed}: {embed: boolean}): Promise<MessageEmbed | Provisions>
    {
        const store = new DataAccess;

        const data = <unknown>await store.getData({
            collection: 'provisions',
            path: 'Name',
            query
        }) as Provisions;

        console.log("hi", data);
        
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

export const provisioner = new ProvisionInformation;