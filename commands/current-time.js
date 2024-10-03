// commands/currenttime.js
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const moment = require('moment-timezone'); // Moment.js with timezone support

module.exports = {
  data: new SlashCommandBuilder()
    .setName('currenttime')
    .setDescription('⏰ Get the current time in a specific GMT timezone.')
    .addIntegerOption(option => 
      option.setName('gmt')
        .setDescription('Pick the GMT timezone (e.g., -5 for GMT-5)')
        .setRequired(true)),

  async execute(interaction) {
    const gmtOffset = interaction.options.getInteger('gmt');

    // Get the current time for the specified GMT timezone
    const currentTime = moment().utcOffset(gmtOffset * 60).unix(); // Get the Unix timestamp

    // Create an embed with a dynamic Discord timestamp
    const timeEmbed = new EmbedBuilder()
      .setColor(0x00BFFF)
      .setTitle('🕒 Current Time')
      .setDescription(`The current time in **GMT${gmtOffset >= 0 ? `+${gmtOffset}` : gmtOffset}** is:`)
      .addFields({ name: 'Time', value: `<t:${currentTime}:F>`, inline: true });

    await interaction.reply({ embeds: [timeEmbed] });
  },
};
