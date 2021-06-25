const { MessageEmbed } = require('discord.js');
const { color, prefix } = require('../config.json');

module.exports = {
	name: 'help',
	description: 'View command help or view all commands.',
	permissions: "everyone",
	usage: "a.help <command name>",
	aliases: ["whatis", "cmds"],
	async execute(client, message, args){
		let cname = client.commands.get(args[0]);
			let semb = new MessageEmbed()
				.setTitle('Unknown command name')
				.setColor('ff0000')
		if (!cname) return semb;
		let helpembed = new MessageEmbed()
			.setTitle(`${prefix}${cname.name} help`)
			.setColor(color)
			.addFields(
				{ name: `Command name:`, value: `${cname.name}` },
				{ name: `Command description:`, value: `${cname.description}` },
				{ name: `Permissions:`, value: `${cname.permissions}` },
				{ name: `Usage:`, value: `${cname.usage}` },
				{ name: `Aliases:`, value: `${cname.aliases.join(", ")}` },
			)
		return message.channel.send(helpembed);
//		let others = new MessageEmbed()
//			.setTitle('All bot commands')
//			.setDescription(`To see advanced command help write:\n${prefix}commandname`)
	}
};