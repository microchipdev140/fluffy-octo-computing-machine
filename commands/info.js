const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('📄 Displays information about Linkr.'),

  async execute(interaction) {
    // Create a decorative embed
    const embed = new EmbedBuilder()
      .setColor(0x00BFFF) // Bright blue color
      .setTitle('🤖 Linkr Bot Information')
      .setDescription('Hello! I am **Linkr**, your all-in-one social media management bot. Here are some details:')
      .addFields(
        { name: '🌟 Features', value: '• Manage your social media accounts\n• Post updates and upload content\n• Track activities across platforms like YouTube and Twitter\n• Enjoy simple commands and automation', inline: false },
        { name: '🔗 Links', value: '[Community Server](https://discord.gg/Yt3ycrU2ny) | [GitHub Repository (SOON)](https://github.com/example)', inline: false },
        { name: '💬 Owner', value: 'Breeze', inline: true },
        { name: '🌐 Version', value: '1.0.0', inline: true }
      )
      .setFooter({ text: 'Thank you for using Linkr!' })
      .setTimestamp();

    // Send the embed as a reply
    await interaction.reply({ embeds: [embed] });
  }
};
