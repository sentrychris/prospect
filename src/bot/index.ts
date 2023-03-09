import { Message, EmbedBuilder } from 'discord.js';
import { prefix, client, settings } from './bootstrap';
  
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
      .setTitle('sentry')
      .setDescription('Sentry ACX.')
      .addFields({ name: 'Version', value: settings.version, inline: true });
      
    message.reply({ embeds: [data] });
  }
    
  if (message.content.startsWith(`${prefix} [command]`)) {
    // [dataAccessHandler].command(message);
  }

});

  
client.login(<string>process.env.TOKEN);