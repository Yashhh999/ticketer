const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');
const ticketSchema = require('../Models/Ticket');
async function ticketUtils(channel) {
    const ticketUtilsEmbed = new EmbedBuilder()
        .setTitle("Ticket Utils")
        .setDescription("Here are the ticket utils");

    const del = new ButtonBuilder()
        .setCustomId('del')
        .setLabel('Delete Ticket')
        .setStyle(ButtonStyle.Danger);

    const lock = new ButtonBuilder()
        .setCustomId('lock')
        .setLabel('Lock Ticket')
        .setStyle(ButtonStyle.Secondary);

    const claim = new ButtonBuilder()
        .setCustomId('claim')
        .setLabel('Claim Ticket')
        .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder()
        .addComponents(del, lock, claim);

    try {
        const msg = await channel.send({ embeds: [ticketUtilsEmbed], components: [row] });
        
        const collector = msg.createMessageComponentCollector({ time: 0 });

        collector.on('collect', async (buttonInteraction) => {
            const member = buttonInteraction.guild.members.cache.get(buttonInteraction.user.id);

            if (buttonInteraction.customId === 'del') {
                if (!member.permissions.has(PermissionFlagsBits.ManageChannels)) {
                    return buttonInteraction.reply({ content: "You don't have permission to delete this ticket.", ephemeral: true });
                }

                await buttonInteraction.channel.delete();
                const ticket = await ticketSchema.findOneAndUpdate({ channelId: channel.id },{status:"deleted"} );
                
            }

            if (buttonInteraction.customId === 'lock') {
                if (!member.permissions.has(PermissionFlagsBits.ManageChannels)) {
                    return buttonInteraction.reply({ content: "You don't have permission to lock this ticket.", ephemeral: true });
                }

                await buttonInteraction.channel.permissionOverwrites.edit(channel.guild.roles.everyone, { ViewChannel: false });
             
                await buttonInteraction.reply({ content: "Ticket locked.", ephemeral: true });
                const ticket = await ticketSchema.findOneAndUpdate({ channelId: channel.id },{status:"locked"} );

            }

            if (buttonInteraction.customId === 'claim') {
                if (!member.permissions.has(PermissionFlagsBits.ManageChannels)) {
                    return buttonInteraction.reply({ content: "You don't have permission to claim this ticket.", ephemeral: true });
                }

                await buttonInteraction.channel.permissionOverwrites.edit(buttonInteraction.user, { ViewChannel: true, SendMessages: true });

                await buttonInteraction.reply({ content: "Ticket claimed.", ephemeral: true });
                await buttonInteraction.channel.setName(`${channel.name}+✅`);
                
            }
        });

    } catch (error) {
        console.error('Error during ticket utilities setup:', error);
    }
}

module.exports = ticketUtils;
