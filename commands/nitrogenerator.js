const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nitrogenerator')
		.setDescription('Generates free nitro!'), // it does not actually do that
	async execute(interaction) {
        const timeMember = await interaction.guild.members.fetch(member.id);
        await timeMember.timeout(300); // idk how many minutes
		await interaction.reply('Nice try');
	},
};