import type { MessageEmbed } from 'discord.js';
import type { Ammo } from '../../shared/interfaces/resource/Ammo';
import { BaseDataAccess } from './BaseDataAccess';

export class AmmoDataAccess extends BaseDataAccess<Ammo>
{
    async request(path: string, query: string, {embed}: {embed: boolean}): Promise<MessageEmbed | Ammo>
    {
        this.title = 'Ammunition';
        this.collection = 'ammo';

        return super.request(path, query, {embed});
    }
}

export const armorer = new AmmoDataAccess;