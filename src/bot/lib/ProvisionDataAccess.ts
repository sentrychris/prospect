import type { MessageEmbed } from 'discord.js';
import type { Provisions } from '../../shared/interfaces/resource/Provisions';
import { BaseDataAccess } from './BaseDataAccess';
import { MongoCollectionKey } from '../../shared/enums/collections';

export class ProvisionDataAccess extends BaseDataAccess<Provisions>
{
  async request(path: string, query: string, {embed}: {embed: boolean}): Promise<MessageEmbed | Provisions>
  {
    this.title = 'Consumable';
    this.collection = MongoCollectionKey.Provision;

    return super.request(path, query, {embed});
  }
}

export const provisioner = new ProvisionDataAccess;