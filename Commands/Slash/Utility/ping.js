const {
        CommandInteraction,
        ApplicationCommandType,
        PermissionFlagsBits,
        Client,
} = require("discord.js");

module.exports = {
        name: "ping",
        description: `Websocket of bot`,
        userPermissions: PermissionFlagsBits.SendMessages,
        botPermissions: PermissionFlagsBits.SendMessages,
        category: "Utility",
        type: ApplicationCommandType.ChatInput,

        run: async (client, interaction) => {
                // Guide: https://discordjs.guide/slash-commands/response-methods.html#command-response-methods
                // 👇 Use this code for .followUp method, only then you will able to use FollowUps messages

                // await interaction
                // .deferReply({ ephemeral: false, fetchReply: true })
                // .catch(() => {});

                interaction.reply({
                        content: `Pong: \`${client.ws.ping}\``,
                        ephemeral: true // set false for normal reply
                });
        },
};
