const {
        CommandInteraction,
        ApplicationCommandType,
        PermissionFlagsBits,
        EmbedBuilder,
        Colors,
} = require("discord.js");

module.exports = {
        ErrorHandler: async (interaction, content) => {

                let textOfError = content;

                const ErrorMessageEmbed = new EmbedBuilder()
                        .setColor(Colors.Yellow)
                        .setDescription(`${textOfError}`);

                interaction.followUp({
                        embeds: [ErrorMessageEmbed],
                });
        },
};
