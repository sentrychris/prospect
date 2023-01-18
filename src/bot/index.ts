import type { TextChannel } from 'discord.js';
import { Message, MessageEmbed } from 'discord.js';
import { prefix, channels, client, settings } from './bootstrap';
import { getRaidTimes } from './lib/RaidTimer';
import { armorer } from './lib/AmmoInformation';
import { backpacker } from './lib/BackpackInformation';
import { tailor } from './lib/ArmorInformation';
import { provisioner } from './lib/ProvisionInformation';
import { medic } from './lib/MedicalInformation';
import { quest } from './lib/QuestInformation';

function getQueryParameter(message: Message, command: string) {
    return message.content.substring(
        message.content.indexOf(`${prefix}${command}`) + `${prefix}${command}`.length
    ).trim();
}
  
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

    if (process.env.IS_DEV) {
        // Iceman dev mode (!isdev)
        if (message.content === `${prefix}isdev up`) {
            message.channel.send('Fuck yeah dev is up');
        }
    }
    
    // Version (!version)
    if (message.content === `${prefix}iceman`) {
        const color = process.env.IS_DEV ? 0x9834DB : 0x3498DB;
        const data = new MessageEmbed()
            .setColor(color)
            .setTitle('Iceman')
            .setDescription('Tarkov Discord bot and API.')
            .addField('Version', settings.version, true);
      
        message.channel.send({ embeds: [data] });
    }
    
    // Tarkov raid time (!time)
    if (message.content === `${prefix}time`) {
        const data = <MessageEmbed>getRaidTimes({
            embed: true
        });
      
        message.channel.send({ embeds: [data] });
    }
    
    // Tarkov ammo info (!ammo [name])
    if (message.content.startsWith(`${prefix}ammo`)) {
        const query = getQueryParameter(message, 'ammo');
        const data = <MessageEmbed>await armorer.request(query, {
            embed: true
        });
      
        message.channel.send({ embeds: [data] });
    }
    
    // Tarkov armor info (!armor [name])
    if (message.content.startsWith(`${prefix}armor`)) {
        const query = getQueryParameter(message, 'armor');
        const data = <MessageEmbed>await tailor.request(query, {
            embed: true
        });
      
        message.channel.send({ embeds: [data] });
    }
    
    // Tarkov backpack info (!backpack [name])
    if (message.content.startsWith(`${prefix}backpack`)) {
        const query = getQueryParameter(message, 'backpack');
        const data = <MessageEmbed>await backpacker.request(query, {
            embed: true
        });
      
        message.channel.send({ embeds: [data] });
    }
    
    // Tarkov medical info (!medic [name])
    if (message.content.startsWith(`${prefix}medic`)) {
        const query = getQueryParameter(message, 'medic');
        const data = <MessageEmbed>await medic.request(query, {
            embed: true
        });
      
        message.channel.send({ embeds: [data] });
    }
    
    // Tarkov medical info (!medic [name])
    if (message.content.startsWith(`${prefix}quest`)) {
        const query = getQueryParameter(message, 'quest');
        const data = <MessageEmbed>await quest.request(query, {
            embed: true
        });
      
        message.channel.send({ embeds: [data] });
    }
    
    // Tarkov provision info (!consume [name])
    if (message.content.startsWith(`${prefix}consume`)) {
        const query = getQueryParameter(message, 'consume');
        const data = <MessageEmbed>await provisioner.request(query, {
            embed: true
        });
      
        message.channel.send({ embeds: [data] });
    }
});
  
client.login(<string>process.env.TOKEN);