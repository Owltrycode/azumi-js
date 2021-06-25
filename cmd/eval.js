const { MessageEmbed } = require('discord.js');
const { color } = require('../config.json');
const { inspect } = require('utils');

module.exports = {
	name: 'eval',
	description: 'Evaluate user\'s input.',
	permissions: "dev-only",
	usage: "a.eval <args>",
	aliases: ["evaluate", "ebal"],
	async execute(client, message, args){
		let devs = ['id1', 'id2'];
		let evld;
			try {
				evaled = await eval(args.join(` `));
				console.log(inspect(evaled));
				message.channel.send('`' + inspect(evaled) + '`')
			} catch (e) {
				console.log(e);
			}
	}
};