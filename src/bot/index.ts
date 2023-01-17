import type { TextChannel } from 'discord.js';
import { Message, MessageEmbed } from 'discord.js';
import { prefix, channels, client } from './bootstrap';
import { getRaidTimes } from './lib/RaidTimer';
import { armorer } from './lib/AmmoInformation';
import { backpacker } from './lib/BackpackInformation';
import { tailor } from './lib/ArmorInformation';
import { provisioner } from './lib/ProvisionInformation';
import { medic } from './lib/MedicalInformation';
import { quest } from './lib/QuestInformation';


client.on('ready', () => {
    console.log('ready');

    // Tarkov raid time loop, posts to #raid-timer every 5 minutes
    setInterval(async () => {
        const channel = <TextChannel>await client.channels.fetch(channels.raidTimer);

        channel.send({ embeds: [getRaidTimes({
            embed: true
        })] });
    }, 300000);
});
 
client.on('messageCreate', async (message: Message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

    // Tarkov raid time (!time)
    if (message.content === `${prefix}time`) {
        const data = getRaidTimes({
            embed: true
        }) as MessageEmbed;

        message.channel.send({ embeds: [data] });
    }

    // Tarkov ammo info (!ammo [name])
    if (message.content.startsWith(`${prefix}ammo`)) {
        const query = message.content.substring(
            message.content.indexOf(`${prefix}ammo`) + `${prefix}ammo`.length
        ).trim();

        const data = await armorer.request(query, {
            embed: true
        }) as MessageEmbed;

        message.channel.send({ embeds: [data] });
    }

    // Tarkov armor info (!armor [name])
    if (message.content.startsWith(`${prefix}armor`)) {
        const query = message.content.substring(
            message.content.indexOf(`${prefix}armor`) + `${prefix}armor`.length
        ).trim();

        const data = await tailor.request(query, {
            embed: true
        }) as MessageEmbed;

        message.channel.send({ embeds: [data] });
    }

    // Tarkov backpack info (!backpack [name])
    if (message.content.startsWith(`${prefix}backpack`)) {
        const query = message.content.substring(
            message.content.indexOf(`${prefix}backpack`) + `${prefix}backpack`.length
        ).trim();

        const data = await backpacker.request(query, {
            embed: true
        }) as MessageEmbed;

        message.channel.send({ embeds: [data] });
    }

    // Tarkov medical info (!medic [name])
    if (message.content.startsWith(`${prefix}medic`)) {
        const query = message.content.substring(
            message.content.indexOf(`${prefix}medic`) + `${prefix}medic`.length
        ).trim();

        const data = await medic.request(query, {
            embed: true
        }) as MessageEmbed;

        message.channel.send({ embeds: [data] });
    }

    // Tarkov medical info (!medic [name])
    if (message.content.startsWith(`${prefix}quest`)) {
        const query = message.content.substring(
            message.content.indexOf(`${prefix}quest`) + `${prefix}quest`.length
        ).trim();

        const data = await quest.request(query, {
            embed: true
        }) as MessageEmbed;

        message.channel.send({ embeds: [data] });
    }

    // Tarkov provision info (!consume [name])
    if (message.content.startsWith(`${prefix}consume`)) {
        const query = message.content.substring(
            message.content.indexOf(`${prefix}consume`) + `${prefix}consume`.length
        ).trim();

        const data = await provisioner.request(query, {
            embed: true
        }) as MessageEmbed;

        message.channel.send({ embeds: [data] });
    }
});
 
client.login((process.env.TOKEN as string));