const {
        CommandInteraction,
        ApplicationCommandType,
        PermissionFlagsBits,
        Client,
} = require("discord.js");

module.exports = {
        name: "",
        description: ``,
        userPermissions: PermissionFlagsBits.SendMessages,
        botPermissions: PermissionFlagsBits.SendMessages,
        category: "",
        type: ApplicationCommandType.ChatInput,

        run: async (client, interaction) => {
                // Guide: https://discordjs.guide/slash-commands/response-methods.html#command-response-methods

                await interaction
                        .deferReply({ ephemeral: false, fetchReply: true })
                        .catch(() => { });

                interaction.followUp({
                        content: `Test..`,
                });
        },
};
