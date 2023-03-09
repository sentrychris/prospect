import type { EmbedBuilder, Message } from 'discord.js';
import type { Armor } from '../../shared/interfaces/resource/Armor';
import { BaseDataAccess } from './BaseDataAccess';
import { MongoCollectionKey } from '../../shared/enums/collections';

export class ArmorDataAccess extends BaseDataAccess<Armor>
{
  async request(path: string, query: string, {embed}: {embed: boolean}): Promise<EmbedBuilder | Armor>
  {
    this.title = 'Armor';
    this.collection = MongoCollectionKey.Armor;

    return super.request(path, query, {embed});
  }

  async command(message: Message)
  {
    const query = this.getQueryParameter(message, 'armor');
    const data = <EmbedBuilder>await this.request('Name', query, {
      embed: true
    });
      
    message.reply({ embeds: [data] });
  }
}

export const tailor = new ArmorDataAccess;