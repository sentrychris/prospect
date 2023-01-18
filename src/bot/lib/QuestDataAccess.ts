import type { MessageEmbed } from 'discord.js';
import type { Quest } from '../../server/interfaces/dao/Quest';
import { BaseDataAccess } from './BaseDataAccess';

export class QuestDataAccess extends BaseDataAccess<Quest>
{
    async request(query: string, {embed}: {embed: boolean}): Promise<MessageEmbed | Quest>
    {
        this.title = 'Quest';
        const data = <unknown>await this.getData({
            collection: 'quests',
            path: 'Quest',
            query
        }, true) as Quest;
        
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

export const quest = new QuestDataAccess;