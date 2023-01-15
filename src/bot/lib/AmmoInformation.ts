import type { Ballistics } from '../../server/interfaces/Ballistics';
import { mongo } from '../bootstrap';
import { MessageEmbed } from 'discord.js';

export class AmmoInformation
{
    async getDataForAmmo(ammo: string) {
        const collection = await mongo.getCollection('ammo');
        const result = await collection.aggregate([{
            $search: {
                index: 'default',
                text: {
                    path: 'Name',
                    query: ammo,
                    fuzzy: {}
                }
            }
        }]).toArray();

        return result[0];
    }
}

/**
 * Fetch ballistics data
 */
export async function getAmmoData(ammo: string, {embed}: {embed: boolean}): Promise<MessageEmbed | Ballistics>
{
    const ammoNotFound = () => {
        return new MessageEmbed()
            .setColor(0xFF0000)
            .setTitle('Ammo Information')
            .setDescription('Nothing Found')
            .addField('Requested', ammo)
    }

    const ballistics = new AmmoInformation;
    const data = <unknown>await ballistics.getDataForAmmo(ammo) as Ballistics;

    if (!data) {
        ammoNotFound()
    }

    if (embed) {
        const message = new MessageEmbed()
            .setColor(0x3498DB)
            .setTitle('Ammo Information')
            .setDescription(`Closest match found for ${ammo}`);

        const excludeFields = ['_id', 'Icon']

        for (const key in data) {
            let field = data[key as keyof Ballistics]

            if (!field || field === "" || field === " ") {
                if (key === '_id' || key === 'Name') {
                    return ammoNotFound()
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