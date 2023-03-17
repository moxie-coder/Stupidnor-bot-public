const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rapbattle')
		.setDescription('You wanna start a rapbattle with him?'),
	async execute(interaction) {
        let shit = ['Just kidding', 'Psych!', 'Nope', 'Psych! Thats the wrong number!', 'Nah', 'You tried'];
        let reply = shit[Math.floor(Math.random() * shit.length)];
		await interaction.reply(`${reply}`); // psych!
	},
};