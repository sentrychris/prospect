import type { EmbedBuilder, Message } from 'discord.js';
import type { Backpack } from '../../shared/interfaces/resource/Backpack';
import { BaseDataAccess } from './BaseDataAccess';
import { MongoCollectionKey } from '../../shared/enums/collections';

export class BackpackDataAccess extends BaseDataAccess<Backpack>
{
  async request(path: string, query: string, {embed}: {embed: boolean}): Promise<EmbedBuilder | Backpack>
  {
    this.title = 'Backpack';
    this.collection = MongoCollectionKey.Backpack;

    return super.request(path, query, {embed});
  }

  async command(message: Message)
  {
    const query = this.getQueryParameter(message, 'backpack');
    const data = <EmbedBuilder>await this.request('Name', query, {
      embed: true
    });
      
    message.reply({ embeds: [data] });
  }
}

export const backpacker = new BackpackDataAccess;