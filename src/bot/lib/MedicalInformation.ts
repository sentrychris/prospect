import type { Medical } from '../../server/interfaces/dao/Medical';
import { MessageEmbed } from 'discord.js';
import { DataAccess } from './DataAccess';

export class MedicalInformation
{
    private title = 'Medical';

    async request(query: string, {embed}: {embed: boolean}): Promise<MessageEmbed | Medical>
    {
        const store = new DataAccess;

        const data = <unknown>await store.getData({
            collection: 'medical',
            path: 'Name',
            query
        }) as Medical;
        
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

export const medic = new MedicalInformation;