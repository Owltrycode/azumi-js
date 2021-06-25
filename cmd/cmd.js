const { MessageEmbed } = require('discord.js');
const { owner, color } = require('../config.json');

module.exports = {
	name: 'cmd',
	description: 'Send linux commands to server.',
	permissions: "owner-only",
	usage: "a.cmd <arguments>",
	aliases: ["exec", "run"],
	async execute(client, message, args){
	
		const args2 = message.content.split(` `);
		const command2 = args2.shift().toLowerCase();
		
		const child_process = require('child_process');
		
			if (message.author.id !== owner) return;
			
			let code = args2.join(" ");
			
			const output = child_process.execSync(code, { encoding: "UTF-8" });
			
				const embed = new MessageEmbed()
					.setColor(color)
					.setDescription('```' + output + '```')
				message.channel.send(embed);
	}
};