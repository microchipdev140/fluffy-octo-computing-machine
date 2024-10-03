// commands/invite.js
const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('invite')
    .setDescription('🔗 Get the invite link for Linkr bot.'),

  async execute(interaction) { // Ensure this function is async
    const inviteLink = `https://discord.com/oauth2/authorize?client_id=${interaction.client.user.id}&permissions=8&scope=bot%20applications.commands`;
    const profileLink = `https://discord.com/oauth2/authorize?client_id=1252933274003836949&permissions=0&scope=bot%20applications.commands`; // Link to authorize bot to put commands in user profile

    const embed = new EmbedBuilder()
      .setColor(0x7289DA)
      .setTitle('🔗 Invite Linkr to Your Server!')
      .setDescription('Use the buttons below to invite **Linkr** to your server.')
      .setImage('https://i.imgur.com/a1WVZnk.png') // Add your custom image URL here
      .setFooter({ text: 'Linkr - Social media & Discord management at your fingertips' });

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel('Invite to Server')
          .setStyle(ButtonStyle.Link)
          .setURL(inviteLink),
        new ButtonBuilder()
          .setLabel('Add to Profile')
          .setStyle(ButtonStyle.Link)
          .setURL(profileLink) // Link for authorizing bot to put commands in user profile
      );

    try {
      await interaction.reply({ embeds: [embed], components: [row] });
    } catch (error) {
      console.error('Failed to reply:', error); // Log any errors
    }
  },
};
