import { Message, EmbedBuilder } from 'discord.js';
import { prefix, client, settings } from './bootstrap';
import { getRaidTimes } from './lib/RaidTimer';
import { armorer } from './lib/AmmoDataAccess';
import { backpacker } from './lib/BackpackDataAccess';
import { mapper } from './lib/MapDataAccess';
import { tailor } from './lib/ArmorDataAccess';
import { provisioner } from './lib/ProvisionDataAccess';
import { medic } from './lib/MedicalDataAccess';
import { quest } from './lib/QuestDataAccess';
  
client.on('ready', () => {
  console.log('ready');
});
  
client.on('messageCreate', async (message: Message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }

  if (message.content === `${prefix} version`) {
    const color = process.env.IS_DEV ? 0x9834DB : 0x3498DB;
    const data = new EmbedBuilder()
      .setColor(color)
      .setTitle('Iceman')
      .setDescription('Tarkov Discord bot and API.')
      .addFields({ name: 'Version', value: settings.version, inline: true });
      
    message.reply({ embeds: [data] });
  }
    
  if (message.content === `${prefix} time`) {
    const data = <EmbedBuilder>getRaidTimes({
      embed: true
    });
      
    message.reply({ embeds: [data] });
  }
    
  if (message.content.startsWith(`${prefix} ammo`)) {
    armorer.command(message);
  }
    
  if (message.content.startsWith(`${prefix} armor`)) {
    tailor.command(message);
  }
    
  if (message.content.startsWith(`${prefix} backpack`)) {
    backpacker.command(message);
  }

  if (message.content.startsWith(`${prefix} consume`)) {
    provisioner.command(message);
  }

  if (message.content.startsWith(`${prefix} map`)) {
    mapper.command(message);
  }
    
  if (message.content.startsWith(`${prefix} medic`)) {
    medic.command(message);
  }
    
  if (message.content.startsWith(`${prefix} quest`)) {
    quest.command(message);
  }
});

  
client.login(<string>process.env.TOKEN);