import type { MessageEmbed } from 'discord.js';
import type { Quest } from '../../server/interfaces/dao/Quest';
import { BaseDataAccess } from './BaseDataAccess';

export class QuestDataAccess extends BaseDataAccess<Quest>
{
    async request(path: string, query: string, {embed}: {embed: boolean}): Promise<MessageEmbed | Quest>
    {
        this.title = 'Quest';
        this.collection = 'quests';

        return super.request(path, query, {embed})
    }
}

export const quest = new QuestDataAccess;