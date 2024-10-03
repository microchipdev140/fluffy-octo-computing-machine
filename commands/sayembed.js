const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('say-embed')
    .setDescription('🔊 Makes the bot say something in an embed.')
    .addStringOption(option => 
      option.setName('message')
        .setDescription('The message for the bot to say in an embed')
        .setRequired(true)),

  async execute(interaction) {
    const message = interaction.options.getString('message');

    // Create an embed
    const embed = new EmbedBuilder()
      .setColor(0x00BFFF) // Bright blue color
      .setTitle('🗨️ Message from Linkr')
      .setDescription(message)
      .setFooter({ text: `Sent by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
      .setTimestamp();

    // Send the embed as a reply
    await interaction.reply({ embeds: [embed] });
  }
};
