import type { EmbedBuilder, Message } from 'discord.js';
import type { Map } from '../../shared/interfaces/resource/Map';
import { BaseDataAccess } from './BaseDataAccess';
import { MongoCollectionKey } from '../../shared/enums/collections';

export class MapDataAccess extends BaseDataAccess<Map>
{
  async request(path: string, query: string, {embed}: {embed: boolean}): Promise<EmbedBuilder | Map>
  {
    this.title = 'Map';
    this.collection = MongoCollectionKey.Map;

    return super.request(path, query, {embed});
  }

  async command(message: Message)
  {
    const query = this.getQueryParameter(message, 'map');
    const data = <EmbedBuilder>await this.request('Name', query, {
      embed: true
    });
    
    message.reply({ embeds: [data] });
  }
}

export const mapper = new MapDataAccess;