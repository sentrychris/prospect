import type { MessageEmbed } from 'discord.js';
import type { Provisions } from '../../server/interfaces/dao/Provisions';
import { BaseDataAccess } from './BaseDataAccess';

export class ProvisionDataAccess extends BaseDataAccess<Provisions>
{
    async request(path: string, query: string, {embed}: {embed: boolean}): Promise<MessageEmbed | Provisions>
    {
        this.title = 'Consumable';
        this.collection = 'provisions';

        return super.request(path, query, {embed})
    }
}

export const provisioner = new ProvisionDataAccess;