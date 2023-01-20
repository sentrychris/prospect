import type { MessageEmbed } from 'discord.js';
import type { Boss } from '../../shared/interfaces/resource/Boss';
import { BaseDataAccess } from './BaseDataAccess';
import { MongoCollectionKey } from '../../shared/enums/collections';

export class BossDataAccess extends BaseDataAccess<Boss>
{
  async request(path: string, query: string, {embed}: {embed: boolean}): Promise<MessageEmbed | Boss>
  {
    this.title = 'Boss';
    this.collection = MongoCollectionKey.Boss;

    return super.request(path, query, {embed});
  }
}

export const bossman = new BossDataAccess;