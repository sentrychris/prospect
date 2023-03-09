import type { EmbedBuilder, Message } from 'discord.js';
import type { Ammo } from '../../shared/interfaces/resource/Ammo';
import { BaseDataAccess } from './BaseDataAccess';
import { MongoCollectionKey } from '../../shared/enums/collections';

export class AmmoDataAccess extends BaseDataAccess<Ammo>
{
  async request(path: string, query: string, {embed}: {embed: boolean}): Promise<EmbedBuilder | Ammo>
  {
    this.title = 'Ammunition';
    this.collection = MongoCollectionKey.Ammo;

    return super.request(path, query, {embed});
  }

  async command(message: Message)
  {
    const query = this.getQueryParameter(message, 'ammo');
      const data = <EmbedBuilder>await this.request('Name', query, {
        embed: true
      });
        
    message.reply({ embeds: [data] });
  }

}

export const armorer = new AmmoDataAccess;