import type { EmbedBuilder, Message } from 'discord.js';
import type { Provisions } from '../../shared/interfaces/resource/Provisions';
import { BaseDataAccess } from './BaseDataAccess';
import { MongoCollectionKey } from '../../shared/enums/collections';

export class ProvisionDataAccess extends BaseDataAccess<Provisions>
{
  async request(path: string, query: string, {embed}: {embed: boolean}): Promise<EmbedBuilder | Provisions>
  {
    this.title = 'Consumable';
    this.collection = MongoCollectionKey.Provision;

    return super.request(path, query, {embed});
  }

  async command(message: Message)
  {
    const query = this.getQueryParameter(message, 'consume');
    const data = <EmbedBuilder>await this.request('Name', query, {
      embed: true
    });
    
    message.reply({ embeds: [data] });
  }
}

export const provisioner = new ProvisionDataAccess;