// commands/avatar.js
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('📷 Get a user\'s avatar.')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('Select a user to get their avatar')),

  async execute(interaction) {
    const user = interaction.options.getUser('target') || interaction.user; // Get target user or fallback to command issuer

    const avatarEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(`👤 ${user.username}'s Avatar`)
      .setImage(user.displayAvatarURL({ dynamic: true, size: 512 }));

    await interaction.reply({ embeds: [avatarEmbed] });
  },
};
