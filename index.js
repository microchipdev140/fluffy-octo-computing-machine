const { Client, GatewayIntentBits, Collection, REST, Events, Routes } = require('discord.js');
const fs = require('fs');
require('dotenv').config(); // Loads the .env file for bot token

// Create a new client instance
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

// Command Collection to store commands
client.commands = new Collection();

// Load all commands from the /commands folder
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const commandsArray = [];

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
  commandsArray.push(command.data.toJSON());
}

// Registering slash commands (directly in index.js)
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationCommands(process.env.BOT_ID), // Use BOT_ID from .env
      { body: commandsArray },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

// Event listener when the bot is ready
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`Bot ID: ${process.env.BOT_ID}`); // Log the Bot ID from .env
});

// Command interaction handling
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

client.on(Events.MessageCreate, async (message) => {
  // Ignore messages from the bot itself
  if (message.author.bot) return;

  // Respond to the restart command
  if (message.content === '@restart/pm2 hello-linkr') {
    try {
      // Send initial message
      const sentMessage = await message.channel.send('<a:emoji_9:1266307862221553684> Restarting.. Please Wait..');

      // Simulate a delay (for example, the time it takes to restart)
      setTimeout(async () => {
        // Edit the message after a delay
        await sentMessage.edit('✅ Restart complete!');
      }, 5000); // Adjust the delay (in milliseconds) as needed
    } catch {
      // Error handling can be added here if needed
    }
  }

  // Respond to the start command
  if (message.content === '@start/pm2 hello-linkr') {
    try {
      // Send initial message
      const sentMessage = await message.channel.send('<a:emoji_9:1266307862221553684> Starting Server 1.. Please Wait..');

      // Simulate a delay (for example, the time it takes to start)
      setTimeout(async () => {
        // Edit the message after a delay
        await sentMessage.edit('✅ Deployment complete!');
      }, 8000); // Adjust the delay (in milliseconds) as needed
    } catch {
      // Error handling can be added here if needed
    }
  }
});

// Login to Discord with your app token
client.login(process.env.DISCORD_TOKEN);
