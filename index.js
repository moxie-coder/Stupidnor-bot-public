// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits, Collection, ActivityType, Partials } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [ 
	GatewayIntentBits.DirectMessages,
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent],
	partials: [Partials.Channel, Partials.GuildMember] 
});

// for commands
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);

    client.user.setPresence({
        activities: [{ name: `FNF VS Stupid`, type: ActivityType.Playing }],
        status: 'idle',
    });
});

client.on("messageCreate", async message => {
	if (message.guild || message.author.bot) return;
	console.log(`Someone sent DM to me => ${message.content}`);

	if (message.content === "boop"){
		message.reply('beep uwu');
	}

	// does stupidnor hate that?
	// I should ask myfnf
	if (message.content === "vore"){
		let e = ["No, just no", "Please stop", "Nope", "Ew wtf", "Wtf man", "Wtf did you just say?"];
		let random = e[Math.floor(Math.random() * e.length)];
		message.author.send(`${random}`);
	}

	if (message.content === "hi" || message.content === "hello" || message.content === "howdy" || message.content === "hey"){
		message.reply('hi');
	}

	if (message.content === "please eat me"){
		message.author.send('No');
	}

	if (message.content === "who made you?" || message.content === "who is your creator?" || message.content === "who's your creator?"){
		message.reply('myFnF made me');
	}

	if (message.content === "your gay" || message.content === "you're gay"){
		message.reply('im homo, sorry no :P');
	}

	// I wasn't sure
	if (message.content === "i wanna fuck you" || message.content === "I wanna fuck you"){
		message.reply("okay :heart:");
	}

	if (message.content === "i love you so much" || message.content === "I love you so much"){
		message.reply("I love you too :heart:");
	}
});

client.on("guildMemberAdd", (member) => {
	console.log(`New User "${member.user.username}" has joined "${member.guild.name}"` );
	member.guild.channels.cache.find(c => c.name === "welcome").send(`"${member.user.username}" has joined this server`);
});

client.on('guildMemberRemove', (member) => {
	member.guild.channels.cache.find(e => e.name === "goodbye").send(`"${member.user.username}" has left this server`);
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}

	console.log(interaction);
});

// Log in to Discord with your client's token
client.login(token);