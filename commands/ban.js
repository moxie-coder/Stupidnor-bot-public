const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Bans a member from the server.')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The member to ban')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
        const member = interaction.options.getMember('target');
        const target = interaction.options.getUser('target');
		const reason = interaction.options.getString('reason') ?? 'No reason provided';

        const timeMember = await interaction.guild.members.fetch(member.id);

        if (!member || !target || !timeMember){
            await interaction.reply({content: "That user does not exist on the server.", ephemeral: true});
            return;
        }

        await interaction.reply(`Banning ${target.username} for reason: ${reason}`);
		await timeMember.ban(target, reason);
	},
};