import type { Provisions } from '../../server/interfaces/Provisions';
import { mongo } from '../bootstrap';
import { MessageEmbed } from 'discord.js';

export class ProvisionInformation
{
    async getDataForProvision(provision: string) {
        const collection = await mongo.getCollection('provisions');
        const result = await collection.aggregate([{
            $search: {
                index: 'default',
                text: {
                    path: 'Name',
                    query: provision,
                    fuzzy: {}
                }
            }
        }]).toArray();

        return result[0];
    }
}

/**
 * Fetch provision data
 */
export async function getProvisionData(provision: string, {embed}: {embed: boolean}): Promise<MessageEmbed | Provisions>
{
    const provisionNotFound = () => {
        return new MessageEmbed()
            .setColor(0xFF0000)
            .setTitle('Consumable Information')
            .setDescription('Nothing Found')
            .addField('Requested', provision)
    }

    const provisions = new ProvisionInformation;
    const data = <unknown>await provisions.getDataForProvision(provision) as Provisions;

    if (!data) {
        provisionNotFound()
    }

    if (embed) {
        const message = new MessageEmbed()
            .setColor(0x3498DB)
            .setTitle('Consumable Information')
            .setDescription(`Closest match found for ${provision}`);

        const excludeFields = ['_id', 'Icon']

        for (const key in data) {
            let field = data[key as keyof Provisions]

            if (!field || field === "" || field === " ") {
                if (key === '_id' || key === 'Name') {
                    return provisionNotFound()
                }
                field = "--"
            }
            
            if (! excludeFields.includes(key)) {
                message.addField(key, field, true)
            }
        }

        return message
    }

    return data;
}