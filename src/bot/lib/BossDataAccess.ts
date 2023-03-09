import type { EmbedBuilder, Message } from 'discord.js';
import type { Boss } from '../../shared/interfaces/resource/Boss';
import { BaseDataAccess } from './BaseDataAccess';
import { MongoCollectionKey } from '../../shared/enums/collections';

export class BossDataAccess extends BaseDataAccess<Boss>
{
  async request(path: string, query: string, {embed}: {embed: boolean}): Promise<EmbedBuilder | Boss>
  {
    this.title = 'Boss';
    this.collection = MongoCollectionKey.Boss;

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

export const bossman = new BossDataAccess;