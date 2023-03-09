import type { EmbedBuilder, Message } from 'discord.js';
import type { Medical } from '../../shared/interfaces/resource/Medical';
import { BaseDataAccess } from './BaseDataAccess';
import { MongoCollectionKey } from '../../shared/enums/collections';

export class MedicalDataAccess extends BaseDataAccess<Medical>
{
  async request(path: string, query: string, {embed}: {embed: boolean}): Promise<EmbedBuilder | Medical>
  {
    this.title = 'Medical';
    this.collection = MongoCollectionKey.Medical;

    return super.request(path, query, {embed});
  }

  async command(message: Message)
  {
    const query = this.getQueryParameter(message, 'medic');
    const data = <EmbedBuilder>await this.request('Name', query, {
      embed: true
    });
      
    message.reply({ embeds: [data] });
  }
}

export const medic = new MedicalDataAccess;