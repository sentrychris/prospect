import type { MessageEmbed } from 'discord.js';
import type { Quest } from '../../server/interfaces/dao/Quest';
import type { BotDataAccess } from '../../server/interfaces/dao/DataAccess';
import { DataAccess } from './DataAccess';

export class QuestInformation implements BotDataAccess<Quest>
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