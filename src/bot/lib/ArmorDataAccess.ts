import type { MessageEmbed } from 'discord.js';
import type { Armor } from '../../shared/interfaces/resource/Armor';
import { BaseDataAccess } from './BaseDataAccess';
import { MongoCollectionKey } from '../../shared/enums/collections';

export class ArmorDataAccess extends BaseDataAccess<Armor>
{
  async request(path: string, query: string, {embed}: {embed: boolean}): Promise<MessageEmbed | Armor>
  {
    this.title = 'Armor';
    this.collection = MongoCollectionKey.Armor;

    return super.request(path, query, {embed});
  }
}

export const tailor = new ArmorDataAccess;