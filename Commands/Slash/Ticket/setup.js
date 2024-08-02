const {
    CommandInteraction,
    ApplicationCommandType,
    PermissionFlagsBits,
    Client,
    ApplicationCommandOptionType,
} = require("discord.js");
const ServerConfig = require('../../../Models/Setup');

module.exports = {
    name: "setup",
    description: `Websocket of bot`,
    userPermissions: PermissionFlagsBits.SendMessages,
    botPermissions: PermissionFlagsBits.SendMessages,
    category: "Utility",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "category",
            description: "Category ID",
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
        // server id
        const categoryName = interaction.options.getString('categoryName');
        const server = interaction.guild.id;
        const support = interaction.options.getRole('support');

        const setupconfig = new ServerConfig({
            guildId: server,
            supportRoleId: support.id,
            categoryName: categoryName,
        });

        try {
            await setupconfig.save();
            await interaction.reply('Configuration saved successfully!');
        } catch (error) {
            console.error(error);
            await interaction.reply('Failed to save configuration.');
        }
    },
};
