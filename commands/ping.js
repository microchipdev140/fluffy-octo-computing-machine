const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('🏓 Replies with Pong and shows latency!'),

  async execute(interaction) {
    const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });

    // Calculate latency
    const latency = sent.createdTimestamp - interaction.createdTimestamp;
    const apiLatency = Math.round(interaction.client.ws.ping);

    // Create an embed for the reply
    const embed = new EmbedBuilder()
      .setColor(0x808080) // Green color
      .setTitle('🏓 Pong!')
      .addFields(
        { name: 'Bot Latency', value: `${latency}ms`, inline: true },
        { name: 'API Latency', value: `${apiLatency}ms`, inline: true }
      )
      .setTimestamp();

    // Edit the initial response to show the embed with latency
    await interaction.editReply({ content: null, embeds: [embed] });
  }
};
