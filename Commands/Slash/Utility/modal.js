const { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, PermissionFlagsBits, ApplicationCommandType } = require('discord.js');

module.exports = {
        name: "modal",
        description: `Example of modal`,
        userPermissions: PermissionFlagsBits.SendMessages,
        botPermissions: PermissionFlagsBits.SendMessages,
        category: "Utility",
        type: ApplicationCommandType.ChatInput,

        run: async (client, interaction) => {
                // Guide: https://discordjs.guide/interactions/modals.html#building-and-responding-with-modals

                const modal = new ModalBuilder()
                        .setCustomId('myModal')
                        .setTitle('Fill the form');


                const favoriteColorInput = new TextInputBuilder()
                        .setCustomId('favoriteColorInput')
                        .setLabel("What's your favorite color?")
                        .setStyle(TextInputStyle.Short);

                const hobbiesInput = new TextInputBuilder()
                        .setCustomId('hobbiesInput')
                        .setLabel("What's some of your favorite hobbies?")
                        .setStyle(TextInputStyle.Paragraph);

                const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
                const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);
                modal.addComponents(firstActionRow, secondActionRow);

                await interaction.showModal(modal);

        },
};
