const {
    CommandInteraction,
    ApplicationCommandType,
    PermissionFlagsBits,
    Client,
    ApplicationCommandOptionType,
    EmbedBuilder,
    ActionRowBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ButtonBuilder,
    ButtonStyle,
    ChannelType,
} = require('discord.js');
const ServerConfig = require('../../../Models/Setup');
const ticketUtils = require('../../../Functions/ticketUtils');

const TicketSchema = require('../../../Models/Ticket');
module.exports = {
    name: "setup",
    description: "Websocket of bot",
    userPermissions: PermissionFlagsBits.SendMessages,
    botPermissions: PermissionFlagsBits.SendMessages,
    category: "Utility",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "category",
            description: "Category name",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "support",
            description: "Support role id",
            type: ApplicationCommandOptionType.Role,
            required: true
        },
    ],

    run: async (client, interaction) => {
        const categoryName = interaction.options.getString('category');
        const server = interaction.guild.id;
        const support = interaction.options.getRole('support');

        let categoryChannel;
        try {
            categoryChannel = await interaction.guild.channels.create({
                name: categoryName,
                type: ChannelType.GuildCategory,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: [PermissionFlagsBits.ViewChannel],
                    },
                    {
                        id: support.id,
                        allow: [PermissionFlagsBits.ViewChannel],
                    },
                ],
            });
        } catch (error) {
            console.error('Error creating category:', error);
            return interaction.reply('Failed to create category.');
        }

        const setupconfig = new ServerConfig({
            guildId: server,
            supportRoleId: support.id,
            categoryName: categoryChannel.id,
        });

        const setupModal = new ModalBuilder()
            .setCustomId('setup')
            .setTitle('Setup Input Form');

        const titleInput = new TextInputBuilder()
            .setCustomId('titleInput')
            .setLabel('Input the title of the ticket')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const descriptionInput = new TextInputBuilder()
            .setCustomId('descriptionInput')
            .setLabel('Input the description of the ticket')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const firstActionRow = new ActionRowBuilder().addComponents(titleInput);
        const secondActionRow = new ActionRowBuilder().addComponents(descriptionInput);
        setupModal.addComponents(firstActionRow, secondActionRow);
        await interaction.showModal(setupModal);

        const modalFilter = (i) => i.customId === 'setup' && i.user.id === interaction.user.id;
        const buttonFilter = (i) => i.customId === 'create' && i.user.id === interaction.user.id;

        const createButton = new ButtonBuilder()
            .setCustomId('create')
            .setLabel('Create Ticket')
            .setStyle(ButtonStyle.Success);

        const row = new ActionRowBuilder().addComponents(createButton);

        try {
            const modalInteraction = await interaction.awaitModalSubmit({ filter: modalFilter, time: 60000 });

            const title = modalInteraction.fields.getTextInputValue('titleInput');
            const description = modalInteraction.fields.getTextInputValue('descriptionInput');

            const setupEmbed = new EmbedBuilder()
                .setTitle(title)
                .setDescription(description);

            await setupconfig.save();

            const setupMessage = await interaction.channel.send({ embeds: [setupEmbed], components: [row] });

            const collector = setupMessage.createMessageComponentCollector({ filter: buttonFilter, time: 0 });

            collector.on('collect', async (buttonInteraction) => {
                if (buttonInteraction.customId === 'create') {
                    await buttonInteraction.deferUpdate();
                    try {
                        const newChannel = await interaction.guild.channels.create({
                            name: `ticket-${interaction.user.username}`,
                            type: ChannelType.GuildText,
                            parent: categoryChannel.id,
                            permissionOverwrites: [
                                {
                                    id: interaction.guild.id,
                                    deny: [PermissionFlagsBits.ViewChannel],
                                },
                                {
                                    id: interaction.user.id,
                                    allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.AddReactions, PermissionFlagsBits.AttachFiles],
                                },
                                {
                                    id: support.id,
                                    allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.AddReactions, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.ManageMessages],
                                },
                            ],
                        });

                        await buttonInteraction.followUp({ content: `Ticket created: ${newChannel}`, ephemeral: true });
                        await ticketUtils(newChannel)

                        const ticketSchema = new TicketSchema({
                            guildId: server,
                            userId: interaction.user.id,
                            channelId: newChannel,
                            category: categoryName,
                        });
                        

                    } catch (error) {
                        console.error('Error creating ticket:', error);
                        await buttonInteraction.followUp({ content: 'Failed to create ticket.', ephemeral: true });
                    }
                }
            });

        } catch (error) {
            console.error('Error during modal submission or setup:', error);
            await interaction.followUp('Failed to save configuration.');
        }


    },
};
