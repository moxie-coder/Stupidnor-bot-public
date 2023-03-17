const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('removetimeout')
		.setDescription('Removes a timeout from a member.')
        .addUserOption(option => option.setName('target').setDescription('The member to timeout').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason to remove the timeout'))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .setDMPermission(false),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
        const member = interaction.options.getMember('target');
        const target = interaction.options.getUser('target');
		const reason = interaction.options.getString('reason') ?? 'No reason provided';

        const timeMember = await interaction.guild.members.fetch(member.id); // for other reasons

        if (!member || !target || !timeMember){
            return await interaction.reply({content: "That user does not exist on the server.", ephemeral: true});
        }

        if (member.user.bot){
            return await interaction.reply({content: "I can't untimeout a bot.", ephemeral: true});
        }

        if (!timeMember.kickable){
            return await interaction.reply({content: "I cannot untimeout this user because they're either their role or themselves are above me", ephemeral: true});
        }

        if (interaction.member.id === timeMember.id){
            return await interaction.reply({content: "You cannot timeout|untimeout yourself", ephemeral: true});
        }

        await interaction.reply(`removing Timeout for user ${target.username} for reason: ${reason}`);
		await timeMember.timeout(null, reason);
	},
};