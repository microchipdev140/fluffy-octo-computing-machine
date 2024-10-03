// commands/serverinfo.js
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('☁️ Displays information about the server.'),

  async execute(interaction) {
    const serverInfoEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle('🌍 Server Information 🌍')
      .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
      .addFields(
        { name: '🏷️ Server Name', value: interaction.guild.name, inline: true },
        { name: '👥 Total Members', value: `${interaction.guild.memberCount}`, inline: true },
        { name: '🌐 Server Region', value: `${interaction.guild.region}`, inline: true },
        { name: '📅 Created At', value: `${interaction.guild.createdAt.toDateString()}`, inline: true },
        { name: '👑 Owner', value: `<@${interaction.guild.ownerId}>`, inline: true },
        { name: '🔒 Verification Level', value: `${interaction.guild.verificationLevel}`, inline: true }
      )
      .setTimestamp()
      .setFooter({ text: 'Server Info', iconURL: interaction.guild.iconURL() });

    await interaction.reply({ embeds: [serverInfoEmbed] });
  },
};
