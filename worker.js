const fs = require('fs');
const discord = require('discord.js');
require('dotenv').config();
const { prefix, color } = require('./config.json');

// Connecting libraries

const client = new discord.Client();
client.commands = new discord.Collection();

const mongoose = require('mongoose');

// Client constants

const commandFiles = fs.readdirSync('./cmd').filter(file => file.endsWith('.js'));

// Reading command directory

for (const file of commandFiles) {
	const command = require(`./cmd/${file}`);
	client.commands.set(command.name, command);
	command.aliases.forEach(elm => client.commands.set(elm, command) );
}

// oof

client.once('ready', () => {
	// Event on bot start
	console.log(`Bot ${client.user.tag} logged in successfully`);
	client.user.setPresence({
		status: 'dnd',
		activity: {
			name: 'a.help | @azumi',
			type: 'COMPETING',
		}
	})
});

client.on('message', (message) => {
	if (message.mentions.users.has(client.user.id) && !message.author.bot) {
	const mpref = new discord.MessageEmbed()
		.setColor(color)
		.setTitle(`Current prefix is a.`)
		.setFooter(`azumi | ${message.author.username}`, client.user.displayAvatarURL())
	message.channel.send(mpref);
	return
	}
});

mongoose
	.connect(process.env.MONGODB_TOKEN, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log('Connected to MONGODB database.');
	})
	.catch((e) => {
		console.log(e);
	});
	
client.on('message', async (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
	|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!client.commands.has(commandName)) return;

try{
	command.execute(client, message, args);
	} catch (err) {
		console.log(err);
		return;
}

});

client.login(process.env.DISCORD_TOKEN);