import type { Quest } from '../../server/interfaces/dao/Quest';
import { MessageEmbed } from 'discord.js';
import { DataAccess } from './DataAccess';

export class QuestInformation
{
    private title = 'Quest';

    async request(query: string, {embed}: {embed: boolean}): Promise<MessageEmbed | Quest>
    {
        const store = new DataAccess;

        const data = <unknown>await store.getData({
            collection: 'quests',
            path: 'Quest',
            query
        }, true) as Quest;
        
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

export const quest = new QuestInformation;