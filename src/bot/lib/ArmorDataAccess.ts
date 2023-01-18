import type { MessageEmbed } from 'discord.js';
import type { Armor } from '../../server/interfaces/dao/Armor';
import { BaseDataAccess } from './BaseDataAccess';

export class ArmorDataAccess extends BaseDataAccess<Armor>
{
    async request(path: string, query: string, {embed}: {embed: boolean}): Promise<MessageEmbed | Armor>
    {
        this.title = 'Armor';
        this.collection = 'armor';

        return super.request(path, query, {embed})
    }
}

export const tailor = new ArmorDataAccess;