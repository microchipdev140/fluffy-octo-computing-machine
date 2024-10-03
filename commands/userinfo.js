// commands/userinfo.js
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('👤 Displays information about a user.')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('🎯 Select a user to get info')),

  async execute(interaction) {
    const user = interaction.options.getUser('target') || interaction.user; // Get target user or fallback to command issuer

    const userInfoEmbed = new EmbedBuilder()
      .setColor(0x0099ff) // Light blue color
      .setTitle(`✨ ${user.username}'s Information ✨`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: '👤 Username', value: `${user.username}`, inline: true },
        { name: '🆔 ID', value: `${user.id}`, inline: true },
        { name: '📅 Account Created', value: `${user.createdAt.toDateString()}`, inline: true },
        { name: '🗓️ Joined Server', value: `${interaction.guild.members.cache.get(user.id).joinedAt.toDateString()}`, inline: true },
        { name: '🤖 Bot?', value: `${user.bot ? 'Yes' : 'No'}`, inline: true }
      )
      .setTimestamp()
      .setFooter({ text: 'User Info', iconURL: user.displayAvatarURL() });

    await interaction.reply({ embeds: [userInfoEmbed] });
  },
};
