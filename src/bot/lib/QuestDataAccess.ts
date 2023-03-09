import type { EmbedBuilder, Message } from 'discord.js';
import type { Quest } from '../../shared/interfaces/resource/Quest';
import { BaseDataAccess } from './BaseDataAccess';
import { MongoCollectionKey } from '../../shared/enums/collections';

export class QuestDataAccess extends BaseDataAccess<Quest>
{
  async request(path: string, query: string, {embed}: {embed: boolean}): Promise<EmbedBuilder | Quest>
  {
    this.title = 'Quest';
    this.collection = MongoCollectionKey.Quest;

    return super.request(path, query, {embed});
  }

  async command(message: Message)
  {
    const query = this.getQueryParameter(message, 'quest');
    const data = <EmbedBuilder>await this.request('Quest', query, {
      embed: true
    });
      
    message.reply({ embeds: [data] });
  }
}

export const quest = new QuestDataAccess;