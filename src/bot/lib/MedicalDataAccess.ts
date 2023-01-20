import type { MessageEmbed } from 'discord.js';
import type { Medical } from '../../shared/interfaces/resource/Medical';
import { BaseDataAccess } from './BaseDataAccess';
import { MongoCollectionKey } from '../../shared/enums/collections';

export class MedicalDataAccess extends BaseDataAccess<Medical>
{
  async request(path: string, query: string, {embed}: {embed: boolean}): Promise<MessageEmbed | Medical>
  {
    this.title = 'Medical';
    this.collection = MongoCollectionKey.Medical;

    return super.request(path, query, {embed});
  }
}

export const medic = new MedicalDataAccess;