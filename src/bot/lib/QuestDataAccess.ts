import type { MessageEmbed } from 'discord.js';
import type { Quest } from '../../shared/interfaces/resource/Quest';
import { BaseDataAccess } from './BaseDataAccess';
import { MongoCollectionKey } from '../../shared/enums/collections';

export class QuestDataAccess extends BaseDataAccess<Quest>
{
  async request(path: string, query: string, {embed}: {embed: boolean}): Promise<MessageEmbed | Quest>
  {
    this.title = 'Quest';
    this.collection = MongoCollectionKey.Quest;

    return super.request(path, query, {embed});
  }
}

export const quest = new QuestDataAccess;