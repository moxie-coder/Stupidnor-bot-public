const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timeout')
		.setDescription('Times out a member.')
        .addUserOption(option => option.setName('target').setDescription('The member to timeout').setRequired(true))
        .addStringOption(option => option.setName('duration').setDescription('The duration of the timeout').addChoices(
            {name: '60 seconds', value: '60'},
            {name: '2 minutes',  value: '120'},
            {name: '10 minutes', value: '600'},
            {name: '15 minutes', value: '900'},
            {name: '20 minutes', value: '1200'},
            {name: '30 minutes', value: '1800'},
            {name: '45 minutes', value: '2700'},
            {name: '1 hour',     value: '3600'},
            {name: '2 hours',    value: '7200'},
            {name: '3 hours',    value: '10000'},
            {name: '5 hours',    value: '18000'},
            {name: '10 hours',   value: '36000'},
            {name: '1 day',      value: '86400'},
            {name: '2 days',     value: '172800'},
            {name: '3 days',     value: '259200'},
            {name: '5 days',     value: '432000'},
            {name: '1 week',     value: '604800'},
            {name: 'Whatever number this is',     value: '99999999000'}, // the limit is 28 days btw
        ))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the timeout'))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .setDMPermission(false),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
        const member = interaction.options.getMember('target');
        const target = interaction.options.getUser('target');
		const reason = interaction.options.getString('reason') ?? 'No reason provided';
		const duration = interaction.options.getString('duration') ?? '60'; // defaults to 60

        const timeMember = await interaction.guild.members.fetch(member.id); // for other reasons

        if (!member || !target || !timeMember){
            return await interaction.reply({content: "That user does not exist on the server.", ephemeral: true});
        }

        if (member.user.bot){
            return await interaction.reply({content: "I can't timeout a bot.", ephemeral: true});
        }

        if (!timeMember.kickable){
            return await interaction.reply({content: "I cannot timeout this user because they're either their role or themselves are above me", ephemeral: true});
        }

        if (interaction.member.id === timeMember.id){
            return await interaction.reply({content: "You cannot timeout|untimeout yourself", ephemeral: true});
        }

        await interaction.reply(`Timeouting user ${target.username} for reason: ${reason}`);
		await timeMember.timeout(duration * 1000, reason);
	},
};