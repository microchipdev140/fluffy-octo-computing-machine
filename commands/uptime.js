// commands/uptime.js
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('uptime')
    .setDescription('⏱️ Check how long the bot has been running.'),

  async execute(interaction) {
    // Get the total uptime in milliseconds
    const totalUptime = interaction.client.uptime;

    // Calculate uptime in hours, minutes, and seconds
    const seconds = Math.floor((totalUptime / 1000) % 60);
    const minutes = Math.floor((totalUptime / (1000 * 60)) % 60);
    const hours = Math.floor((totalUptime / (1000 * 60 * 60)) % 24);
    const days = Math.floor(totalUptime / (1000 * 60 * 60 * 24));

    // Create an embed with the uptime details
    const uptimeEmbed = new EmbedBuilder()
      .setColor(0x00BFFF) // You can customize the color
      .setTitle('🕒 Bot Uptime')
      .setDescription(`I have been running for:`)
      .addFields(
        { name: 'Days', value: `${days}`, inline: true },
        { name: 'Hours', value: `${hours}`, inline: true },
        { name: 'Minutes', value: `${minutes}`, inline: true },
        { name: 'Seconds', value: `${seconds}`, inline: true }
      );

    await interaction.reply({ embeds: [uptimeEmbed] });
  },
};
