import type { Medical } from '../../server/interfaces/Medical';
import { mongo } from '../bootstrap';
import { MessageEmbed } from 'discord.js';

export class MedicalInformation
{
    async getDataForMedical(medical: string) {
        const collection = await mongo.getCollection('medical');
        const result = await collection.aggregate([{
            $search: {
                index: 'default',
                text: {
                    path: 'Name',
                    query: medical,
                    fuzzy: {}
                }
            }
        }]).toArray();

        return result[0];
    }
}

/**
 * Fetch medical data
 */
export async function getMedicalData(medical: string, {embed}: {embed: boolean}): Promise<MessageEmbed | Medical>
{
    const medicalNotFound = () => {
        return new MessageEmbed()
            .setColor(0xFF0000)
            .setTitle('Medical Information')
            .setDescription('Nothing Found')
            .addField('Requested', medical)
    }

    const medic = new MedicalInformation;
    const data = <unknown>await medic.getDataForMedical(medical) as Medical;

    if (!data) {
        medicalNotFound()
    }

    if (embed) {
        const message = new MessageEmbed()
            .setColor(0x3498DB)
            .setTitle('Medical Information')
            .setDescription(`Closest match found for ${medical}`);

        const excludeFields = ['_id', 'Icon']

        for (const key in data) {
            let field = data[key as keyof Medical]

            if (!field || field === "" || field === " ") {
                if (key === '_id' || key === 'Name') {
                    return medicalNotFound()
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