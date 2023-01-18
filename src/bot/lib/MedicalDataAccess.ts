import type { MessageEmbed } from 'discord.js';
import type { Medical } from '../../server/interfaces/dao/Medical';
import { BaseDataAccess } from './BaseDataAccess';

export class MedicalDataAccess extends BaseDataAccess<Medical>
{
    async request(query: string, {embed}: {embed: boolean}): Promise<MessageEmbed | Medical>
    {
        this.title = 'Medical';
        const data = <unknown>await this.getData({
            collection: 'medical',
            path: 'Name',
            query
        }) as Medical;
        
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

export const medic = new MedicalDataAccess;