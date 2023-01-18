import { mongo } from '../bootstrap';
import { MessageEmbed } from 'discord.js';
import type {
    DataAccess,
    DataAccessEmbed,
    DataAccessObject,
    DataAccessRequest
} from '../../server/interfaces/dao/DataAccess';

export class BaseDataAccess<T extends DataAccessObject> implements DataAccess<T>
{
    private _title = '';

    private _collection = 'default';

    get title() {
        return this._title;
    }

    set title(title: string) {
        this._title = title;
    }

    get collection() {
      return this._collection;
    }

    set collection(collection: string) {
      this._collection = collection;
    }
    
    async request(path: string, query: string, {embed}: {embed: boolean}): Promise<MessageEmbed | T>
    {
        const data = <T>await this.getData({
            collection: this.collection,
            path,
            query
        }, true);
        
        if (!data) {
            this.embedNotFound(query, this.title);
        }
        
        if (embed) {
            return this.embedData({
                data,
                title: this.title,
                query
            });
        }
        
        return data;
    }

    private async getData(req: DataAccessRequest, noindex = true) {
        const data = await mongo.getCollection(req.collection);

        if (noindex) {
            return await data.findOne({
                [req.path]: new RegExp(<string>req.query, 'i')
            });
        }

        const result = await data.aggregate([{
            $search: {
                index: 'default',
                text: {
                    path: req.path,
                    query: req.query,
                    fuzzy: {}
                }
            },
        }, { $limit: 1 }]).toArray();

        return result[0];
    }

    private embedData(embed: DataAccessEmbed) {
        const color = process.env.IS_DEV ? 0x9834DB : 0x3498DB;
        const message = new MessageEmbed()
            .setColor(color)
            .setTitle(`${embed.title} Information`)
            .setDescription(`Closest match found for ${embed.query}`);
        
        const excludeFields = ['_id', 'Icon'];
        
        for (const key in embed.data) {
            let field: string = embed.data[key as keyof typeof embed.data];
            
            if (!field || field === '' || field === ' ') {
                if (key === '_id' || key === 'Name') {
                    return this.embedNotFound(embed.query, embed.title);
                }
                field = '--';
            }
            
            if (! excludeFields.includes(key)) {
                message.addField(key, field, true);
            }
        }
        
        return message;
    }

    private embedNotFound(request: string, title: string) {
        return new MessageEmbed()
            .setColor(0xFF0000)
            .setTitle(`${title} Information`)
            .setDescription('Nothing Found')
            .addField('Requested', request);
    }
}