import type { MessageEmbed } from 'discord.js';
import type { Medical } from '../../server/interfaces/dao/Medical';
import type { BotDataAccess } from '../../server/interfaces/dao/DataAccess';
import { DataAccess } from './DataAccess';

export class MedicalDataAccess implements BotDataAccess<Medical>
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

export const medic = new MedicalDataAccess;