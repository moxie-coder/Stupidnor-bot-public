const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('owo')
		.setDescription('whats this?'),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
		await interaction.reply({content: 'OwO whats this?', files: ["./images/owo.jpg"], ephemeral: true});
	},
};