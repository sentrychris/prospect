import type { MessageEmbed } from 'discord.js';
import type { Backpack } from '../../shared/interfaces/resource/Backpack';
import { BaseDataAccess } from './BaseDataAccess';
import { MongoCollectionKey } from '../../shared/enums/collections';

export class BackpackDataAccess extends BaseDataAccess<Backpack>
{
  async request(path: string, query: string, {embed}: {embed: boolean}): Promise<MessageEmbed | Backpack>
  {
    this.title = 'Backpack';
    this.collection = MongoCollectionKey.Backpack;

    return super.request(path, query, {embed});
  }
}

export const backpacker = new BackpackDataAccess;