const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('📣 Makes the bot say something in plain text.')
    .addStringOption(option =>
      option.setName('message')
        .setDescription('The message for the bot to say')
        .setRequired(true)),

  async execute(interaction) {
    const message = interaction.options.getString('message');

    // Send the plain text message as a reply
    await interaction.reply({ content: message });
  }
};
