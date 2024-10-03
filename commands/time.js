// commands/time.js
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const moment = require('moment'); // Standard moment.js

module.exports = {
  data: new SlashCommandBuilder()
    .setName('time')
    .setDescription('⌚ Shows the time when the command was run.'),

  async execute(interaction) {
    const runTime = moment().unix(); // Get the current Unix timestamp

    // Create an embed that shows when the command was executed
    const timeEmbed = new EmbedBuilder()
      .setColor(0x00BFFF)
      .setTitle('⌚ Command Run Time')
      .setDescription('This command was run at:')
      .addFields({ name: 'Time', value: `<t:${runTime}:F>`, inline: true });

    await interaction.reply({ embeds: [timeEmbed] });
  },
};
