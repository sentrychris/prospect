import { mongo } from '../bootstrap';
import { MessageEmbed } from "discord.js";
import type {
    DataAccessEmbed,
    DataAccessRequest
} from '../../server/interfaces/dao/DataAccess';

export class DataAccess
{
    async getData(req: DataAccessRequest) {
        const data = await mongo.getCollection(req.collection);
        const result = await data.aggregate([{
            $search: {
                index: 'default',
                text: {
                    path: req.path,
                    query: req.query,
                    fuzzy: {}
                }
            }
        }]).toArray();

        return result[0];
    }

    embedData(embed: DataAccessEmbed) {
        const message = new MessageEmbed()
            .setColor(0x3498DB)
            .setTitle(`${embed.title} Information`)
            .setDescription(`Closest match found for ${embed.query}`);
        
        const excludeFields = ['_id', 'Icon']
        
        for (const key in embed.data) {
            let field: string = embed.data[key as keyof typeof embed.data]
            
            if (!field || field === "" || field === " ") {
                if (key === '_id' || key === 'Name') {
                    return this.embedNotFound(embed.query, embed.title)
                }
                field = "--"
            }
            
            if (! excludeFields.includes(key)) {
                message.addField(key, field, true)
            }
        }
        
        return message
    }

    embedNotFound(request: string, title: string) {
        return new MessageEmbed()
            .setColor(0xFF0000)
            .setTitle(`${title} Information`)
            .setDescription('Nothing Found')
            .addField('Requested', request)
    }
}